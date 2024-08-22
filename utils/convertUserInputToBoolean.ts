export default function convertUserInputToBoolean (input: string) {

    const normalizedInput = input.trim().toLowerCase()

    const trueValues = ["yes", "sim", "y", "remote", "r", "true"]

    if(trueValues.includes(normalizedInput)){
        return true
    }

    return false
}