import json
import os
import urllib.request
import urllib.error


def forward_to_main_crm(order):
    """
    Forward a lead to main's central admin CRM (/api/leads/admin), same
    pattern every other landing on the network uses. Fails silently —
    the lead is already saved locally regardless.
    """
    token = os.environ.get('MAIN_ADMIN_TOKEN', '')
    if not token:
        print('CRM forward not configured: MAIN_ADMIN_TOKEN missing')
        return

    payload = json.dumps({
        'child_name': order.name,
        'phone': order.phone,
        'source': 'old.mycomputer.education',
        'notes': f'Заявка з old.mycomputer.education: {order.message}',
    }).encode('utf-8')

    req = urllib.request.Request(
        'https://mycomputer.education/api/leads/admin',
        data=payload,
        headers={'Content-Type': 'application/json', 'x-admin-token': token},
        method='POST',
    )
    try:
        urllib.request.urlopen(req, timeout=10)
    except (urllib.error.URLError, urllib.error.HTTPError) as e:
        print(f'CRM forward failed: {e}')
