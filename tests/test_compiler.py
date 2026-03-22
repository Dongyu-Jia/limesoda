"""
Tests for the proto-driven LangGraph compiler.
"""

import sys
from pathlib import Path

import pytest

# Ensure schema/proto is importable for workflow_pb2
sys.path.insert(0, str(Path(__file__).parent.parent))
sys.path.insert(0, str(Path(__file__).parent.parent / "schema" / "proto"))

import workflow_pb2
from engine.nodes.compiler import compile_process, parse_textpb

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


# ── Parse tests ───────────────────────────────────────────────────────────

class TestParseTextpb:
    def test_minimal(self):
        process = parse_textpb(MINIMAL_TEXTPB)
        assert process.id == "test-001"
        assert process.name == "Minimal Test Process"
        assert process.entry_node_id == "start"
        assert len(process.nodes) == 2
        assert len(process.edges) == 2

    def test_node_fields(self):
        process = parse_textpb(MINIMAL_TEXTPB)
        start = process.nodes[0]
        assert start.id == "start"
        assert start.name == "Start"
        assert start.description == "Entry node"

    def test_edge_fields(self):
        process = parse_textpb(MINIMAL_TEXTPB)
        edge = process.edges[0]
        assert edge.from_node_id == "start"
        assert edge.to_node_id == "finish"
        assert edge.on_status == workflow_pb2.OUTPUT_STATUS_UNSPECIFIED

    def test_conditional_edges(self):
        process = parse_textpb(CONDITIONAL_TEXTPB)
        cond_edges = [e for e in process.edges if e.from_node_id == "reviewer"]
        assert len(cond_edges) == 2
        statuses = {e.on_status for e in cond_edges}
        assert workflow_pb2.PASS in statuses
        assert workflow_pb2.FAIL in statuses

    def test_p1_market_research(self):
        path = EXAMPLES_DIR / "p1_market_research" / "p1_market_research.textpb"
        if not path.exists():
            pytest.skip("Example file not found")
        process = parse_textpb(path.read_text())
        assert process.name == "P1 Market Research"
        assert len(process.nodes) == 6
        assert process.entry_node_id == "generator"
        # Check agent on generator node
        gen = next(n for n in process.nodes if n.id == "generator")
        assert gen.HasField("agent")
        assert gen.agent.name == "A1-Product-Manager"

    def test_coding_agent(self):
        path = EXAMPLES_DIR / "coding_agent" / "coding_agent.textpb"
        if not path.exists():
            pytest.skip("Example file not found")
        process = parse_textpb(path.read_text())
        assert process.name == "Coding Implementation Agent"
        assert len(process.nodes) == 6
        assert process.entry_node_id == "planner"

    def test_override_rules(self):
        path = EXAMPLES_DIR / "p1_market_research" / "p1_market_research.textpb"
        if not path.exists():
            pytest.skip("Example file not found")
        process = parse_textpb(path.read_text())
        assert len(process.rules) == 1
        rule = process.rules[0]
        assert rule.node_id == "generator"
        assert rule.max_runs == 3
        assert rule.override_status == workflow_pb2.ESCALATE_TO_HUMAN

    def test_invalid_textpb_raises(self):
        """Ensure malformed textpb raises a ParseError."""
        with pytest.raises(Exception):
            parse_textpb("totally invalid { not a proto")


# ── Compile tests ─────────────────────────────────────────────────────────

class TestCompileProcess:
    def test_minimal_compile(self):
        process = parse_textpb(MINIMAL_TEXTPB)
        graph = compile_process(process)
        assert graph is not None

    def test_conditional_compile(self):
        process = parse_textpb(CONDITIONAL_TEXTPB)
        graph = compile_process(process)
        assert graph is not None

    def test_p1_compile(self):
        path = EXAMPLES_DIR / "p1_market_research" / "p1_market_research.textpb"
        if not path.exists():
            pytest.skip("Example file not found")
        process = parse_textpb(path.read_text())
        graph = compile_process(process)
        assert graph is not None

    def test_coding_agent_compile(self):
        path = EXAMPLES_DIR / "coding_agent" / "coding_agent.textpb"
        if not path.exists():
            pytest.skip("Example file not found")
        process = parse_textpb(path.read_text())
        graph = compile_process(process)
        assert graph is not None

    def test_graph_has_nodes(self):
        process = parse_textpb(MINIMAL_TEXTPB)
        graph = compile_process(process)
        node_names = [n.name for n in graph.get_graph().nodes.values()]
        assert "start" in node_names
        assert "finish" in node_names

    def test_mermaid_output(self):
        process = parse_textpb(MINIMAL_TEXTPB)
        graph = compile_process(process)
        mermaid = graph.get_graph().draw_mermaid()
        assert "start" in mermaid
        assert "finish" in mermaid

    def test_ascii_output(self):
        process = parse_textpb(MINIMAL_TEXTPB)
        graph = compile_process(process)
        ascii_art = graph.get_graph().draw_ascii()
        assert "start" in ascii_art
        assert "finish" in ascii_art
