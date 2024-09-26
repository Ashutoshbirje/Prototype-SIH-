let step = 'login';
let inputMethod = 'text';
let complaintText = '';
let suggestedSections = [];
let draftFIR = '';
let useAR = false;

// DOM Elements
const contentArea = document.getElementById('content-area');
const restartBtn = document.getElementById('restart-btn');
const exitBtn = document.getElementById('exit-btn');

// Functions to handle each step
function renderLogin() {
  contentArea.innerHTML = `
    <input type="text" class="input" placeholder="Username">
    <input type="password" class="input" placeholder="Password">
    <button class="btn" id="login-btn">Login</button>
  `;
  
  document.getElementById('login-btn').addEventListener('click', handleLogin);
}

function handleLogin() {
  step = 'receiveComplaint';
  renderReceiveComplaint();
}

function renderReceiveComplaint() {
  contentArea.innerHTML = `
    <div class="btn-group">
      <button class="btn ${inputMethod === 'text' ? '' : 'outline'}" id="text-input-btn">Text</button>
      <button class="btn ${inputMethod === 'voice' ? '' : 'outline'}" id="voice-input-btn">Voice</button>
    </div>
    ${inputMethod === 'text' ? `
      <textarea class="textarea" placeholder="Type the complaint details here..." id="complaint-textarea"></textarea>
    ` : `
      <button class="btn" id="start-recording-btn"><i class="mic"></i> Start Recording</button>
    `}
    <button class="btn" id="submit-complaint-btn">Submit Complaint</button>
  `;

  document.getElementById('text-input-btn').addEventListener('click', () => handleInputMethod('text'));
  document.getElementById('voice-input-btn').addEventListener('click', () => handleInputMethod('voice'));
  document.getElementById('submit-complaint-btn').addEventListener('click', handleComplaintSubmit);
}

function handleInputMethod(method) {
  inputMethod = method;
  renderReceiveComplaint();
}

function handleComplaintSubmit() {
  suggestedSections = ['Section 302 IPC', 'Section 120B IPC'];
  step = 'reviewSuggestions';
  renderReviewSuggestions();
}

function renderReviewSuggestions() {
  contentArea.innerHTML = `
    <div class="alert">
      <strong>Suggested Sections:</strong>
      <div>${suggestedSections.join('<br>')}</div>
    </div>
    <button class="btn" id="generate-draft-btn">Generate Draft FIR</button>
  `;

  document.getElementById('generate-draft-btn').addEventListener('click', handleGenerateDraft);
}

function handleGenerateDraft() {
  draftFIR = 'Draft FIR content based on the complaint...';
  step = 'reviewDraft';
  renderReviewDraft();
}

function renderReviewDraft() {
  contentArea.innerHTML = `
    <textarea class="textarea" id="draft-fir-textarea">${draftFIR}</textarea>
    <button class="btn" id="edit-draft-btn"><i class="edit"></i> Edit Draft</button>
    <button class="btn" id="finalize-fir-btn"><i class="check"></i> Finalize FIR</button>
  `;

  document.getElementById('edit-draft-btn').addEventListener('click', () => step = 'editDraft');
  document.getElementById('finalize-fir-btn').addEventListener('click', handleFinalizeFIR);
}

function handleFinalizeFIR() {
  step = 'finalizeAR';
  renderFinalizeAR();
}

function renderFinalizeAR() {
  contentArea.innerHTML = `
    <div>
      <input type="checkbox" id="use-ar-checkbox" ${useAR ? 'checked' : ''}> Use AR for additional context
    </div>
    ${useAR ? `
      <button class="btn"><i class="camera"></i> Scan Environment</button>
      <div>Displaying contextual legal information...</div>
    ` : ''}
    <button class="btn" id="complete-process-btn">Complete FIR</button>
  `;

  document.getElementById('use-ar-checkbox').addEventListener('change', (e) => {
    useAR = e.target.checked;
    renderFinalizeAR();
  });

  document.getElementById('complete-process-btn').addEventListener('click', handleCompleteProcess);
}

function handleCompleteProcess() {
  step = 'completed';
  renderCompleted();
}

function renderCompleted() {
  contentArea.innerHTML = `
    <div class="alert">
      <strong>FIR Completed</strong><br>
      The FIR has been successfully generated and saved.
    </div>
  `;
}

// Initial render
renderLogin();

// Navigation event listeners
restartBtn.addEventListener('click', () => {
  step = 'login';
  renderLogin();
});

exitBtn.addEventListener('click', () => {
  contentArea.innerHTML = '<div>Process exited.</div>';
});
