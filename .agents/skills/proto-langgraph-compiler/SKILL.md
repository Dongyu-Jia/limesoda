---
name: proto-langgraph-compiler
description: Proto-Driven LangGraph Compiler — Compile textpb Process definitions into LangGraph StateGraphs with auto-generated diagrams.
---

# Proto-Driven LangGraph Compiler

## Overview

The compiler at `engine/nodes/compiler.py` reads Process definitions in textpb format (matching `schema/proto/workflow.proto`) and dynamically compiles them into LangGraph `StateGraph` objects.

Uses native `google.protobuf.text_format.Parse()` against compiled `workflow_pb2` — full schema validation, proper enum handling, no custom parser.

## Prerequisites

Generate the Python proto bindings (one-time):
```bash
pip install protobuf grpcio-tools
python -m grpc_tools.protoc -I=schema/proto --python_out=schema/proto schema/proto/workflow.proto
```
- **Compiler**: `compile_process()` builds a LangGraph `StateGraph` from the dataclasses
- **Renderer**: `render_diagram()` generates PNG via LangGraph's Mermaid rendering

## File Layout

```
engine/nodes/
├── __init__.py
├── compiler.py                       # Core compiler module
└── examples/
    ├── p1_market_research/
    │   ├── p1_market_research.textpb  # Process definition
    │   └── p1_market_research.png     # Auto-generated diagram
    └── coding_agent/
        ├── coding_agent.textpb
        └── coding_agent.png
```

## Usage

### CLI
```bash
python engine/nodes/compiler.py <path/to/process.textpb>
```

### Programmatic
```python
from engine.nodes.compiler import parse_textpb, compile_process, render_diagram

process = parse_textpb(open("my_process.textpb").read())
graph = compile_process(process)          # returns compiled LangGraph
render_diagram(process, Path("out.png"))  # saves PNG
```

## Textpb Format

The textpb follows the `Process` message from `schema/proto/workflow.proto`:
- **Unconditional edges**: use `on_status: OUTPUT_STATUS_UNSPECIFIED`
- **Conditional edges**: use `on_status: PASS / FAIL / ESCALATE_TO_HUMAN`
- **Terminal edges**: use `to_node_id: "end"` to map to LangGraph's `END`
- **OverrideRules**: define `max_runs` and `override_status` per node

See existing examples in `engine/nodes/examples/` for reference.

## Tests

```bash
python -m pytest tests/test_compiler.py -v
```
