import IMask from "imask";

export function applyPhoneMask(inputElementId: string) {
  const input = document.getElementById(inputElementId) as HTMLInputElement;
  if (!input) return;

  const mask = IMask(input, {
    mask: "+{7} (000) 000-00-00",
  });

  return mask;
}
