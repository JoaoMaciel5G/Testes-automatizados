export default function convertUserInputToBoolean (input: string | null | undefined): boolean {
    const normalizedInput = (input || "").trim().toLowerCase();

    const trueValues = new Set(["yes", "sim", "y", "remote", "r", "true"]);

    return trueValues.has(normalizedInput);
}