// Sendet ein Formular an das eigene Backend (/api/forms). Die Einträge erscheinen
// im Admin-Bereich unter /admin und werden – falls eingerichtet – per E-Mail gemeldet.
export const submitForm = async (
  formName: string,
  fields: Record<string, string>,
): Promise<boolean> => {
  try {
    const res = await fetch("/api/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ form: formName, page: window.location.pathname, fields }),
    });
    return res.ok;
  } catch {
    return false;
  }
};
