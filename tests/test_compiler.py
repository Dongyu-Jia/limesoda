"""
Tests for the proto-driven LangGraph compiler.
"""

import sys
from pathlib import Path

import pytest

# Ensure schema/proto is importable for workflow_pb2
sys.path.insert(0, str(Path(__file__).parent.parent))
sys.path.insert(0, str(Path(__file__).parent.parent / "schema" / "proto"))

import sys
from pathlib import Path
from typing import Any

import pytest

# Ensure schema/proto is importable for workflow_pb2
sys.path.insert(0, str(Path(__file__).parent.parent))
sys.path.insert(0, str(Path(__file__).parent.parent / "schema" / "proto"))

import workflow_pb2
from engine.nodes.compiler import LangGraphCompiler, ProtobufParser, DefaultNodeFactory

# ── Fixtures ──────────────────────────────────────────────────────────────

EXAMPLES_DIR = Path(__file__).parent.parent / "engine" / "nodes" / "examples"

MINIMAL_TEXTPB = """
id: "test-001"
name: "Minimal Test Process"
entry_node_id: "start"

nodes {
  id: "start"
  name: "Start"
  description: "Entry node"
}

nodes {
  id: "finish"
  name: "Finish"
  description: "Exit node"
}

edges { from_node_id: "start"  to_node_id: "finish"  on_status: OUTPUT_STATUS_UNSPECIFIED }
edges { from_node_id: "finish" to_node_id: "end"     on_status: OUTPUT_STATUS_UNSPECIFIED }
"""

CONDITIONAL_TEXTPB = """
id: "test-002"
name: "Conditional Test"
entry_node_id: "worker"

nodes {
  id: "worker"
  name: "Worker"
  description: "Does work"
}

nodes {
  id: "reviewer"
  name: "Reviewer"
  description: "Reviews work"
}

nodes {
  id: "done"
  name: "Done"
  description: "Completed"
}

edges { from_node_id: "worker"    to_node_id: "reviewer"  on_status: OUTPUT_STATUS_UNSPECIFIED }
edges { from_node_id: "reviewer"  to_node_id: "done"      on_status: PASS }
edges { from_node_id: "reviewer"  to_node_id: "worker"    on_status: FAIL }
edges { from_node_id: "done"      to_node_id: "end"       on_status: OUTPUT_STATUS_UNSPECIFIED }
"""


# ── Mocks for DI Testing ──────────────────────────────────────────────────

class MockGraphBuilder:
    """A graph builder that just records calls instead of building a real graph."""
    def __init__(self):
        self.nodes = []
        self.edges = []
        self.entry_point = None
        self.conditional_edges = []

    def add_node(self, node_id: str, node_func: Any) -> None:
        self.nodes.append(node_id)

    def set_entry_point(self, node_id: str) -> None:
        self.entry_point = node_id

    def add_edge(self, start_node: str, end_node: str) -> None:
        self.edges.append((start_node, end_node))

    def add_conditional_edges(self, source_id: str, router_func: Any, status_map: dict[str, str]) -> None:
        self.conditional_edges.append((source_id, status_map))

    def compile(self) -> Any:
        return self


# ── Parse tests ───────────────────────────────────────────────────────────

class TestParseTextpb:
    def test_minimal(self):
        parser = ProtobufParser()
        process = parser.parse(MINIMAL_TEXTPB)
        assert process.id == "test-001"
        assert process.name == "Minimal Test Process"
        assert len(process.nodes) == 2

    def test_invalid_textpb_raises(self):
        parser = ProtobufParser()
        with pytest.raises(Exception):
            parser.parse("totally invalid { not a proto")


# ── DI & Logic Tests ──────────────────────────────────────────────────────

class TestCompilerDI:
    def test_injection_works(self):
        """Verify that injecting a mock builder records the correct calls."""
        mock_builder = MockGraphBuilder()
        compiler = LangGraphCompiler(
            builder_factory=lambda: mock_builder
        )
        
        compiler.compile(MINIMAL_TEXTPB)
        
        assert "start" in mock_builder.nodes
        assert "finish" in mock_builder.nodes
        assert mock_builder.entry_point == "start"
        assert ("start", "finish") in mock_builder.edges
        assert ("finish", "end") in mock_builder.edges

    def test_conditional_logic_injection(self):
        """Verify conditional edges are recorded correctly in mock builder."""
        mock_builder = MockGraphBuilder()
        compiler = LangGraphCompiler(builder_factory=lambda: mock_builder)
        
        compiler.compile(CONDITIONAL_TEXTPB)
        
        assert len(mock_builder.conditional_edges) == 1
        source, smap = mock_builder.conditional_edges[0]
        assert source == "reviewer"
        assert smap["PASS"] == "done"
        assert smap["FAIL"] == "worker"


# ── Integration Tests (Default implementations) ───────────────────────────

class TestCompilerIntegration:
    @pytest.fixture
    def compiler(self):
        return LangGraphCompiler()

    def test_minimal_compile(self, compiler):
        graph = compiler.compile(MINIMAL_TEXTPB)
        assert graph is not None
        # Verify it's a real LangGraph compiled object
        assert hasattr(graph, "get_graph")

    def test_p1_market_research(self, compiler):
        path = EXAMPLES_DIR / "p1_market_research" / "p1_market_research.textpb"
        if not path.exists():
            pytest.skip("Example file not found")
        process = compiler.parser.parse_file(path)
        graph = compiler.compile_proto(process)
        assert graph is not None
        
        node_ids = [n.id for n in process.nodes]
        assert "generator" in node_ids
        
    def test_graph_topology(self, compiler):
        graph = compiler.compile(MINIMAL_TEXTPB)
        mermaid = graph.get_graph().draw_mermaid()
        assert "start" in mermaid
        assert "finish" in mermaid
        assert "__end__" in mermaid
