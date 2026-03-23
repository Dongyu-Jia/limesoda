# P7-02: Implementation Execution

## Objective
Execute the implementation of a feature or module based on an approved **Implementation Plan** and the **Verification Criteria** defined.

### 1. Preparation
- Review the **Implementation Plan**: Understand the components, file changes, and architectural requirements.
- Review the **Verification Criteria**: Ensure you know the exact success criteria and the commands for verification.

### 2. Requirements Overview (To pass Reviewers)
To ensure a smooth review phase, keep these constraints in mind during coding:
- **Dependency Injection (P7-03)**: Isolate and inject all non-loadable dependencies (Network APIs, Disk I/O, Heavy Frameworks).
- **Test Coverage (P7-04)**: Aim for **95%+** coverage of all identified scenarios (happy paths and edge cases).
- **Code Style (P7-06)**: 
    - Keep function and file modular and simple.
    - Use **Straightforward/Intuitive naming**.
- **Avoid Rebuilding the Wheel**: Do not reinvent the wheel. Use existing open source libraries and frameworks to implement the feature.
- **Documentation (P7-08)**: Include clear docstrings and create a **Demo file** in a `demo/` subfolder.
- **Performance (P7-09)**: Avoid redundant calculations and ensure efficient resource management.

### 3. Execution Steps
Write code to implement the feature/test and run tests untils success.

### 4. Verification
- **Hit Success Criteria**: Confirm that the final output meets all criteria defined in the plan and PRD.

### 5. Demo
-- Since the test is mocked with dependency, we need to create a demo to show the actual behavior of the module.
-- in a subfolder demo, create a demo file to demonstrate the functionality of the module, with instructions on how to run it.
