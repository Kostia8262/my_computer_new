import os
import smtplib
from email.header import Header
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime
from html import escape


def send_lead_notification(order):
    """
    Send an HTML email notification for a new lead, mirroring the Node
    landings' mailer.js pattern (same Gmail account, same layout).
    Fails silently — the lead is already saved locally regardless.
    """
    smtp_user = os.environ.get('SMTP_USER', '')
    smtp_pass = os.environ.get('SMTP_PASS', '')
    if not smtp_user or not smtp_pass:
        print('Email notification not configured: SMTP_USER or SMTP_PASS missing')
        return

    smtp_host = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
    smtp_port = int(os.environ.get('SMTP_PORT', '587'))
    to_addr = os.environ.get('NOTIFY_EMAIL', smtp_user)

    time_str = datetime.now().strftime('%d.%m.%Y %H:%M')

    # Escape before interpolating into HTML — order.name/message are raw
    # user input and were previously inserted unescaped, so a lead message
    # containing HTML/script tags rendered live in whoever's mail client
    # opened the notification.
    safe_name = escape(order.name)
    safe_phone = escape(order.phone)
    safe_message = escape(order.message)

    html = f"""\
<!DOCTYPE html>
<html lang="uk">
<head><meta charset="UTF-8"/></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:20px">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1)">
    <div style="background:#242538;padding:20px 28px">
      <h2 style="color:#fff;margin:0;font-size:18px">Нова заявка — old.mycomputer.education</h2>
    </div>
    <div style="padding:24px 28px">
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px 0;color:#888;width:140px">Ім'я</td><td style="padding:8px 0;font-weight:600">{safe_name}</td></tr>
        <tr><td style="padding:8px 0;color:#888">Телефон</td><td style="padding:8px 0"><strong><a href="tel:{safe_phone}" style="color:#242538;text-decoration:none">{safe_phone}</a></strong></td></tr>
        <tr><td style="padding:8px 0;color:#888">Повідомлення</td><td style="padding:8px 0">{safe_message}</td></tr>
        <tr><td style="padding:8px 0;color:#888">Заявка №</td><td style="padding:8px 0">#{order.id}</td></tr>
        <tr><td style="padding:8px 0;color:#888">Час</td><td style="padding:8px 0">{time_str}</td></tr>
      </table>
    </div>
    <div style="background:#f5f5f7;padding:16px 28px;border-top:1px solid #eee">
      <p style="margin:0;color:#888;font-size:13px">Передзвоніть протягом 30 хвилин</p>
    </div>
  </div>
</body>
</html>"""

    text = (
        f"Нова заявка #{order.id}\n"
        f"Ім'я: {order.name}\n"
        f"Телефон: {order.phone}\n"
        f"Повідомлення: {order.message}\n"
        f"Час: {time_str}"
    )

    msg = MIMEMultipart('alternative')
    msg['From'] = f'My Computer Academy <{smtp_user}>'
    msg['To'] = to_addr
    # Header() strips/encodes anything that could inject extra headers via
    # CR/LF in a lead's name — raw f-string interpolation didn't.
    msg['Subject'] = Header(f'Нова заявка (old): {order.name}'.replace('\r', ' ').replace('\n', ' '), 'utf-8')
    msg.attach(MIMEText(text, 'plain', 'utf-8'))
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    try:
        with smtplib.SMTP(smtp_host, smtp_port, timeout=10) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.sendmail(smtp_user, [to_addr], msg.as_string())
        print(f'[MAIL] Notification sent to {to_addr} for order #{order.id}')
    except Exception as e:
        print(f'[MAIL ERROR] Failed to send notification: {e}')
