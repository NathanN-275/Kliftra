// Super-basic mock to simulate server behavior.
// Swap these functions for your real API later.

let lastRequestId = '';
let lastDestination = '';
let lastCode = '';

export async function requestPasswordReset(destination: string) {
  // pretend we asked the server to send an SMS/email and it replied with a requestId
  lastDestination = destination.trim();
  lastCode = Math.floor(100000 + Math.random() * 900000).toString(); // e.g., "483219"
  lastRequestId = `${Date.now()}`;
  console.log('[mock] sending code', lastCode, 'to', lastDestination);
  return { requestId: lastRequestId };
}

export async function verifyResetCode(requestId: string, code: string) {
  if (requestId !== lastRequestId) throw new Error('Invalid request');
  if (code.trim() !== lastCode) throw new Error('Invalid code');
  return { ok: true };
}

export async function resetPassword(requestId: string, newPassword: string) {
  if (requestId !== lastRequestId) throw new Error('Invalid request');
  // pretend it succeeded
  return { ok: true };
}

export async function resendCode(requestId: string) {
  if (requestId !== lastRequestId) throw new Error('Invalid request');
  lastCode = Math.floor(100000 + Math.random() * 900000).toString();
  console.log('[mock] re-sending code', lastCode, 'to', lastDestination);
  return { ok: true };
}
