import emoji


def convert_emojis_to_text(text):
    return emoji.demojize(text)


text_with_emoji = "I love programming! 😭"
text_without_emoji = convert_emojis_to_text(text_with_emoji)

print(text_without_emoji)
