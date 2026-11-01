
def evaluate_pronunciation(result):
    """
    Analyzes the pronunciation of the target phoneme /ɹ/.
    """

    expected_phones = result["expected_phones"][0]
    heard_phones = result["heard_phones"]
    confidence = result["heard_phones_confidence"]

    target_phone = "ɹ"

    # Find the position of the target phoneme
    if target_phone not in expected_phones:
        return {
            "status": "target_not_found",
            "message": "The target phoneme was not found."
        }

    target_index = expected_phones.index(target_phone)

    detected_phone = heard_phones[target_index]
    detected_confidence = confidence[target_index]

    return {
        "target_phone": target_phone,
        "detected_phone": detected_phone,
        "confidence": detected_confidence
    }
