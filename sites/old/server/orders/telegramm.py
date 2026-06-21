import os
import telepot

token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
chat_id = int(os.environ.get('TELEGRAM_CHAT_ID', '0'))

def send_message(text):
    if not token or not chat_id:
        print('Telegram not configured: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing')
        return
    bot = telepot.Bot(token)
    bot.sendMessage(chat_id, text, parse_mode='Markdown')