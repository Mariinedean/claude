// ============================================
// QUANTUM TERMINAL - MAIN APPLICATION
// ============================================

// ============================================
// MATRIX RAIN BACKGROUND
// ============================================
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ============================================
// NAVIGATION SYSTEM
// ============================================
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.content-section');

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetSection = btn.dataset.section;

        sections.forEach(section => {
            section.classList.remove('active');
        });

        document.getElementById(targetSection).classList.add('active');
    });
});

// ============================================
// SYSTEM CLOCK
// ============================================
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour12: false });
    const dateString = now.toLocaleDateString('en-US');
    const systemTime = document.getElementById('system-time');
    if (systemTime) {
        systemTime.textContent = `${dateString} ${timeString}`;
    }
}

setInterval(updateClock, 1000);
updateClock();

// ============================================
// TERMINAL SYSTEM WITH HIDDEN FILES
// ============================================
const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');

// Virtual file system with hidden files for easter eggs
const fileSystem = {
    'readme.txt': 'Welcome to the Quantum Terminal. Type "help" for commands.',
    'about.txt': 'Portfolio site for a quantitative researcher and developer.',
    'papers.txt': 'List of research papers - use the PAPERS section to view.',
    'repos.txt': 'Code repositories - use the CODE section to view.',
    '.secret': '🎯 SECRET FILE: The matrix has you...',
    '.easter_egg_1': '🥚 You found the first easter egg! The sophistication in chaos is real.',
    '.konami': '⬆⬆⬇⬇⬅➡⬅➡🅱🅰 You know the code.',
    '.quant_wisdom': '💹 "In God we trust, all others must bring data." - W. Edwards Deming',
    '.matrix_wisdom': '💊 "There is no spoon. Only mathematical models."',
    '.hidden_message': '🔐 I know kung fu... and stochastic calculus.',
};

const commandHistory = [];
let historyIndex = -1;

// Terminal commands
const commands = {
    help: () => {
        return `Available commands:
  help        - Show this help message
  clear       - Clear terminal
  ls          - List files
  ls -a       - List all files (including hidden)
  cat [file]  - Display file contents
  whoami      - Display user info
  date        - Show current date/time
  matrix      - Toggle matrix rain
  calc        - Open calculator
  papers      - View research papers
  repos       - View code repositories
  hack        - ???
  konami      - Try the konami code
  fortune     - Get a random quote`;
    },

    clear: () => {
        terminalOutput.innerHTML = '';
        return '';
    },

    ls: () => {
        const files = Object.keys(fileSystem).filter(f => !f.startsWith('.'));
        return files.join('  ');
    },

    'ls -a': () => {
        return Object.keys(fileSystem).join('  ');
    },

    cat: (filename) => {
        if (!filename) {
            return 'Usage: cat [filename]';
        }
        if (fileSystem[filename]) {
            return fileSystem[filename];
        }
        return `cat: ${filename}: No such file or directory`;
    },

    whoami: () => {
        return 'root@quantum - Quantitative Researcher & Developer';
    },

    date: () => {
        return new Date().toString();
    },

    matrix: () => {
        const matrixCanvas = document.getElementById('matrix-bg');
        if (matrixCanvas.style.display === 'none') {
            matrixCanvas.style.display = 'block';
            return 'Matrix rain enabled';
        } else {
            matrixCanvas.style.display = 'none';
            return 'Matrix rain disabled';
        }
    },

    calc: () => {
        document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
        document.getElementById('linalg').classList.add('active');
        return 'Opening linear algebra calculator...';
    },

    papers: () => {
        document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
        document.getElementById('papers').classList.add('active');
        return 'Opening research papers...';
    },

    repos: () => {
        document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
        document.getElementById('repos').classList.add('active');
        return 'Opening code repositories...';
    },

    hack: () => {
        return `Hacking in progress...
[████████████████████] 100%
Access granted. You're in. Welcome to the mainframe.`;
    },

    konami: () => {
        return fileSystem['.konami'];
    },

    fortune: () => {
        const fortunes = [
            '💡 "The best time to plant a tree was 20 years ago. The second best time is now."',
            '📊 "In quant we trust, all others bring data."',
            '🎯 "Risk comes from not knowing what you\'re doing." - Warren Buffett',
            '🚀 "The stock market is a device for transferring money from the impatient to the patient."',
            '💻 "First, solve the problem. Then, write the code." - John Johnson',
            '🧠 "Alpha is hard to find. Beta is easy to fake."',
            '⚡ "Volatility is not risk. Permanent loss of capital is risk."',
            '🎲 "The market can remain irrational longer than you can remain solvent." - Keynes',
        ];
        return fortunes[Math.floor(Math.random() * fortunes.length)];
    },
};

function executeCommand(input) {
    const parts = input.trim().split(' ');
    const cmd = parts[0];
    const args = parts.slice(1).join(' ');

    // Handle commands with flags
    if (input.trim() === 'ls -a') {
        return commands['ls -a']();
    }

    if (commands[cmd]) {
        return commands[cmd](args);
    } else if (cmd) {
        return `Command not found: ${cmd}. Type 'help' for available commands.`;
    }
    return '';
}

terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const input = terminalInput.value;

        // Add command to output
        const commandLine = document.createElement('div');
        commandLine.className = 'terminal-line';
        commandLine.innerHTML = `<span class="terminal-prompt">root@quantum:~$</span> ${input}`;
        terminalOutput.appendChild(commandLine);

        // Execute command
        const output = executeCommand(input);
        if (output) {
            const outputLine = document.createElement('div');
            outputLine.className = 'terminal-line';
            outputLine.style.whiteSpace = 'pre-wrap';
            outputLine.textContent = output;
            terminalOutput.appendChild(outputLine);
        }

        // Add to history
        if (input.trim()) {
            commandHistory.push(input);
            historyIndex = commandHistory.length;
        }

        // Clear input
        terminalInput.value = '';

        // Scroll to bottom
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            terminalInput.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            terminalInput.value = '';
        }
    }
});

// ============================================
// LINEAR ALGEBRA CALCULATOR SWITCHING
// ============================================
const calcBtns = document.querySelectorAll('.calc-btn');
const calcSections = document.querySelectorAll('.calc-section');

calcBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetCalc = btn.dataset.calc;

        calcBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        calcSections.forEach(section => {
            section.classList.remove('active');
        });

        document.getElementById(`${targetCalc}-calc`).classList.add('active');
    });
});

// ============================================
// MATRIX OPERATIONS
// ============================================
function parseMatrix(input) {
    try {
        const rows = input.trim().split(';');
        return rows.map(row => row.split(',').map(n => parseFloat(n.trim())));
    } catch (e) {
        throw new Error('Invalid matrix format');
    }
}

function displayMatrix(matrix) {
    return matrix.map(row => row.map(n => n.toFixed(4)).join('  ')).join('\n');
}

function matrixAdd(a, b) {
    if (a.length !== b.length || a[0].length !== b[0].length) {
        throw new Error('Matrices must have the same dimensions');
    }
    return a.map((row, i) => row.map((val, j) => val + b[i][j]));
}

function matrixSubtract(a, b) {
    if (a.length !== b.length || a[0].length !== b[0].length) {
        throw new Error('Matrices must have the same dimensions');
    }
    return a.map((row, i) => row.map((val, j) => val - b[i][j]));
}

function matrixMultiply(a, b) {
    if (a[0].length !== b.length) {
        throw new Error('Invalid dimensions for matrix multiplication');
    }
    const result = [];
    for (let i = 0; i < a.length; i++) {
        result[i] = [];
        for (let j = 0; j < b[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < a[0].length; k++) {
                sum += a[i][k] * b[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}

function matrixTranspose(matrix) {
    return matrix[0].map((_, i) => matrix.map(row => row[i]));
}

function matrixDeterminant(matrix) {
    const n = matrix.length;
    if (n !== matrix[0].length) {
        throw new Error('Matrix must be square');
    }

    if (n === 1) return matrix[0][0];
    if (n === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    let det = 0;
    for (let j = 0; j < n; j++) {
        const minor = matrix.slice(1).map(row => row.filter((_, i) => i !== j));
        det += Math.pow(-1, j) * matrix[0][j] * matrixDeterminant(minor);
    }
    return det;
}

function matrixInverse(matrix) {
    const n = matrix.length;
    if (n !== matrix[0].length) {
        throw new Error('Matrix must be square');
    }

    const det = matrixDeterminant(matrix);
    if (Math.abs(det) < 1e-10) {
        throw new Error('Matrix is singular (determinant is zero)');
    }

    if (n === 2) {
        return [
            [matrix[1][1] / det, -matrix[0][1] / det],
            [-matrix[1][0] / det, matrix[0][0] / det]
        ];
    }

    // For larger matrices, use Gauss-Jordan elimination
    const augmented = matrix.map((row, i) => [...row, ...Array(n).fill(0).map((_, j) => i === j ? 1 : 0)]);

    for (let i = 0; i < n; i++) {
        let maxRow = i;
        for (let k = i + 1; k < n; k++) {
            if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
                maxRow = k;
            }
        }
        [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];

        const pivot = augmented[i][i];
        for (let j = 0; j < 2 * n; j++) {
            augmented[i][j] /= pivot;
        }

        for (let k = 0; k < n; k++) {
            if (k !== i) {
                const factor = augmented[k][i];
                for (let j = 0; j < 2 * n; j++) {
                    augmented[k][j] -= factor * augmented[i][j];
                }
            }
        }
    }

    return augmented.map(row => row.slice(n));
}

function matrixOperation(operation) {
    const resultDisplay = document.getElementById('matrix-result');
    try {
        const matrixA = parseMatrix(document.getElementById('matrix-a').value);

        let result;
        switch (operation) {
            case 'add':
                const matrixB_add = parseMatrix(document.getElementById('matrix-b').value);
                result = matrixAdd(matrixA, matrixB_add);
                resultDisplay.textContent = displayMatrix(result);
                break;
            case 'subtract':
                const matrixB_sub = parseMatrix(document.getElementById('matrix-b').value);
                result = matrixSubtract(matrixA, matrixB_sub);
                resultDisplay.textContent = displayMatrix(result);
                break;
            case 'multiply':
                const matrixB_mul = parseMatrix(document.getElementById('matrix-b').value);
                result = matrixMultiply(matrixA, matrixB_mul);
                resultDisplay.textContent = displayMatrix(result);
                break;
            case 'transpose':
                result = matrixTranspose(matrixA);
                resultDisplay.textContent = displayMatrix(result);
                break;
            case 'determinant':
                result = matrixDeterminant(matrixA);
                resultDisplay.textContent = `Determinant = ${result.toFixed(6)}`;
                break;
            case 'inverse':
                result = matrixInverse(matrixA);
                resultDisplay.textContent = displayMatrix(result);
                break;
        }
    } catch (e) {
        resultDisplay.textContent = `Error: ${e.message}`;
    }
}

// ============================================
// VECTOR OPERATIONS
// ============================================
function parseVector(input) {
    return input.split(',').map(n => parseFloat(n.trim()));
}

function vectorOperation(operation) {
    const resultDisplay = document.getElementById('vector-result');
    try {
        const vectorA = parseVector(document.getElementById('vector-a').value);

        let result;
        switch (operation) {
            case 'add':
                const vectorB_add = parseVector(document.getElementById('vector-b').value);
                if (vectorA.length !== vectorB_add.length) {
                    throw new Error('Vectors must have the same dimension');
                }
                result = vectorA.map((v, i) => v + vectorB_add[i]);
                resultDisplay.textContent = `[${result.map(v => v.toFixed(4)).join(', ')}]`;
                break;
            case 'subtract':
                const vectorB_sub = parseVector(document.getElementById('vector-b').value);
                if (vectorA.length !== vectorB_sub.length) {
                    throw new Error('Vectors must have the same dimension');
                }
                result = vectorA.map((v, i) => v - vectorB_sub[i]);
                resultDisplay.textContent = `[${result.map(v => v.toFixed(4)).join(', ')}]`;
                break;
            case 'dot':
                const vectorB_dot = parseVector(document.getElementById('vector-b').value);
                if (vectorA.length !== vectorB_dot.length) {
                    throw new Error('Vectors must have the same dimension');
                }
                result = vectorA.reduce((sum, v, i) => sum + v * vectorB_dot[i], 0);
                resultDisplay.textContent = `Dot product = ${result.toFixed(6)}`;
                break;
            case 'cross':
                const vectorB_cross = parseVector(document.getElementById('vector-b').value);
                if (vectorA.length !== 3 || vectorB_cross.length !== 3) {
                    throw new Error('Cross product only defined for 3D vectors');
                }
                result = [
                    vectorA[1] * vectorB_cross[2] - vectorA[2] * vectorB_cross[1],
                    vectorA[2] * vectorB_cross[0] - vectorA[0] * vectorB_cross[2],
                    vectorA[0] * vectorB_cross[1] - vectorA[1] * vectorB_cross[0]
                ];
                resultDisplay.textContent = `[${result.map(v => v.toFixed(4)).join(', ')}]`;
                break;
            case 'magnitude':
                result = Math.sqrt(vectorA.reduce((sum, v) => sum + v * v, 0));
                resultDisplay.textContent = `Magnitude = ${result.toFixed(6)}`;
                break;
            case 'normalize':
                const mag = Math.sqrt(vectorA.reduce((sum, v) => sum + v * v, 0));
                if (mag === 0) {
                    throw new Error('Cannot normalize zero vector');
                }
                result = vectorA.map(v => v / mag);
                resultDisplay.textContent = `[${result.map(v => v.toFixed(6)).join(', ')}]`;
                break;
        }
    } catch (e) {
        resultDisplay.textContent = `Error: ${e.message}`;
    }
}

// ============================================
// EIGENVALUE CALCULATION (2x2 matrices only for simplicity)
// ============================================
function eigenOperation() {
    const resultDisplay = document.getElementById('eigen-result');
    try {
        const matrix = parseMatrix(document.getElementById('eigen-matrix').value);

        if (matrix.length !== matrix[0].length) {
            throw new Error('Matrix must be square');
        }

        if (matrix.length === 2) {
            // For 2x2: λ² - trace(A)λ + det(A) = 0
            const a = matrix[0][0];
            const b = matrix[0][1];
            const c = matrix[1][0];
            const d = matrix[1][1];

            const trace = a + d;
            const det = a * d - b * c;

            const discriminant = trace * trace - 4 * det;

            if (discriminant >= 0) {
                const lambda1 = (trace + Math.sqrt(discriminant)) / 2;
                const lambda2 = (trace - Math.sqrt(discriminant)) / 2;
                resultDisplay.textContent = `Eigenvalues:\nλ₁ = ${lambda1.toFixed(6)}\nλ₂ = ${lambda2.toFixed(6)}`;
            } else {
                const real = trace / 2;
                const imag = Math.sqrt(-discriminant) / 2;
                resultDisplay.textContent = `Eigenvalues (complex):\nλ₁ = ${real.toFixed(6)} + ${imag.toFixed(6)}i\nλ₂ = ${real.toFixed(6)} - ${imag.toFixed(6)}i`;
            }
        } else {
            resultDisplay.textContent = 'Eigenvalue calculation currently supports 2x2 matrices.\nFor larger matrices, use numerical methods (not yet implemented).';
        }
    } catch (e) {
        resultDisplay.textContent = `Error: ${e.message}`;
    }
}

// ============================================
// INITIALIZATION
// ============================================
console.log('%c QUANTUM TERMINAL LOADED ', 'background: #00ff41; color: #000; font-size: 20px; font-weight: bold;');
console.log('%c Type help in the terminal for available commands ', 'color: #00ff41; font-size: 12px;');
console.log('%c Try: ls -a to see hidden files... ', 'color: #ff0055; font-size: 12px;');
