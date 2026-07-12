import os
import telepot

token = os.environ.get('TELEGRAM_BOT_TOKEN')
id = int(os.environ.get('TELEGRAM_CHAT_ID', '0'))
telegrammBot = telepot.Bot(token) if token else None


def send_message(text):
    if not telegrammBot:
        return
    telegrammBot.sendMessage(id, text, parse_mode='Markdown')
