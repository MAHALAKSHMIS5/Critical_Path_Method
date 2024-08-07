Critical Path Method for Project Management

What is a Critical Task?
- A task that cannot be delayed without delaying the project's completion. 

What is the Critical Path?
- The longest sequence of critical tasks. It determines the minimum project completion time. Delays in these tasks delay the entire project.

Benefits of Using CPM:
1. Visualize the project schedule.
2. Highlight important tasks.
3. Identify and manage risks.
4. Improve team communication.

Steps to Find the Critical Path:
1. Identify all tasks.
2. Determine task sequence.
3. Estimate task durations.
4. Draw a network diagram.
5. Identify the critical path.
6. Calculate the float.
7. Monitor the critical path.

Example:
Activity| Duration (weeks) | Precedents
---|---|---
A | 6 | –
B | 4 | –
C | 3 | A
D | 4 | B
E | 3 | B
F | 10 | –
G | 3 | E, F
H | 2 | C, D

Rules for Designing the Activity-on-Node Network Diagram:
1. One start node.
2. One end node.
3. Nodes have duration.
4. Links have no duration.
5. No loops or dangles.

Node Representation:
- Activity label: Name of the activity.
- Earliest Start (ES): Earliest start time.
- Earliest Finish (EF): Earliest finish time.
- Latest Start (LS): Latest start time.
- Latest Finish (LF): Latest finish time.
- Float: Difference between ES and LS or EF and LF.

Forward Pass Calculation:
- Determine the earliest start and finish times for each activity.

Backward Pass Calculation:
- Determine the latest start and finish times to avoid delaying the project.

Identifying the Critical Path:
- Calculate the float for each activity. 
- Activities with zero float are critical and form the critical path. 

For example, if activities F and G have zero float, they are critical activities. Delaying them delays the entire project.
