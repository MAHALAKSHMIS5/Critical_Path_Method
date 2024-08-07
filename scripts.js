

let activityCount = 1;
let activities = [];


function addActivity() {
    activityCount++;
    const activityDiv = document.createElement('div');
    activityDiv.classList.add('activity');
    activityDiv.innerHTML = `
        <label for="activityName${activityCount}">Activity Name:</label>
        <input type="text" id="activityName${activityCount}" name="activityName" required>
        <label for="duration${activityCount}">Duration:</label>
        <input type="number" id="duration${activityCount}" name="duration" required>
        <label for="precedence${activityCount}">Precedence (comma separated):</label>
        <input type="text" id="precedence${activityCount}" name="precedence">
    `;
    document.getElementById('activities').appendChild(activityDiv);
}


document.getElementById('cpmForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addActivityToTable();
    calculateCPM(activities);
});


function addActivityToTable() {
    const activityElements = document.querySelectorAll('.activity');
    activities = []; // Reset the activities array


    activityElements.forEach((activity, index) => {
        const name = activity.querySelector(`input[name="activityName"]`).value;
        const duration = parseInt(activity.querySelector(`input[name="duration"]`).value, 10);
        const precedence = activity.querySelector(`input[name="precedence"]`).value.split(',').map(p => p.trim()).filter(p => p !== '');
        activities.push({ name, duration, precedence, es: 0, ef: 0, ls: 0, lf: 0 });
    });


    updateActivityTable();
}


function updateActivityTable() {
    const tbody = document.querySelector('#activityTable tbody');
    tbody.innerHTML = ''; // Clear existing rows


    activities.forEach(activity => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${activity.name}</td>
            <td>${activity.duration}</td>
            <td>${activity.precedence.join(', ')}</td>
        `;
        tbody.appendChild(row);
    });
}


function calculateCPM(activities) {
    // Forward Pass
    activities.forEach(activity => {
        activity.precedence.forEach(predecessor => {
            const predActivity = activities.find(a => a.name === predecessor);
            if (predActivity) {
                activity.es = Math.max(activity.es, predActivity.ef);
            }
        });
        activity.ef = activity.es + activity.duration;
    });


    // Backward Pass
    const lastActivity = activities.reduce((prev, curr) => curr.ef > prev.ef ? curr : prev, activities[0]);
    lastActivity.lf = lastActivity.ef;
    lastActivity.ls = lastActivity.lf - lastActivity.duration;


    for (let i = activities.length - 1; i >= 0; i--) {
        const activity = activities[i];
        if (activity.precedence.length === 0) {
            activity.lf = lastActivity.lf;
            activity.ls = activity.lf - activity.duration;
        } else {
            const successors = activities.filter(a => a.precedence.includes(activity.name));
            if (successors.length > 0) {
                activity.lf = Math.min(...successors.map(a => a.ls));
                activity.ls = activity.lf - activity.duration;
            } else {
                activity.lf = lastActivity.lf;
                activity.ls = activity.lf - activity.duration;
            }
        }
    }


    displayResults(activities);
}


function displayResults(activities) {
    const forwardNodes = activities.map(activity => ({
        id: activity.name,
        label: `${activity.name}\nES: ${activity.es}, EF: ${activity.ef}`,
        color: '#66b3ff'
    }));


    const backwardNodes = activities.map(activity => ({
        id: activity.name,
        label: `${activity.name}\nLS: ${activity.ls}, LF: ${activity.lf}`,
        color: '#66b3ff'
    }));


    const edges = [];
    activities.forEach(activity => {
        activity.precedence.forEach(predecessor => {
            edges.push({ from: predecessor, to: activity.name });
        });
    });


    const criticalPathNodes = activities
        .filter(activity => activity.es === activity.ls)
        .map(activity => activity.name);


    const containerForward = document.getElementById('networkForward');
    const containerBackward = document.getElementById('networkBackward');


    const dataForward = { nodes: new vis.DataSet(forwardNodes), edges: new vis.DataSet(edges) };
    const dataBackward = { nodes: new vis.DataSet(backwardNodes), edges: new vis.DataSet(edges) };


    const options = {
        layout: {
            hierarchical: {
                direction: 'UD',
                sortMethod: 'directed'
            }
        },
        edges: {
            arrows: {
                to: true
            }
        }
    };


    const networkForward = new vis.Network(containerForward, dataForward, options);
    const networkBackward = new vis.Network(containerBackward, dataBackward, options);


    // Highlight Critical Path
    criticalPathNodes.forEach(node => {
        const nodeObj = networkBackward.body.nodes[node];
        if (nodeObj) {
            nodeObj.setOptions({ color: { background: '#ff6666' } });
        }
    });


    // Print Critical Path
    const criticalPathString = criticalPathNodes.join(' -> ');
    const criticalPathContainer = document.getElementById('criticalPath');
    criticalPathContainer.textContent = `The critical path is: ${criticalPathString}`;
}




