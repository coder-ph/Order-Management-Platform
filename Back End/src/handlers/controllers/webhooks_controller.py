from src.startup.logging import Logger
from src.services_layer.validators.index import request_has_json
from models.index import InvoiceStatus
from src.error.index import compile_error
from src.handlers.services.index import ordersService

logger = Logger("webhook controller")

@request_has_json([])
def confirm_transaction(payload):
    try:
        stk_callback = payload.get('stkCallback', {})
        item_list = stk_callback.get("CallbackMetadata", {}).get("Item", [])
        status =  str(InvoiceStatus.COMPLETE) if stk_callback.get("ResultCode") == 0  else str(InvoiceStatus.FAILED)
        rec_no = next((item["Value"] for item in item_list if item["Name"] == "MpesaReceiptNumber"), None)
        req_id = stk_callback.get("MerchantRequestID")

        ordersService.confirm_transaction(req_id, status, rec_no, stk_callback.get("ResultDesc"))

        return {"message": "processing webhook"}, 200

    except Exception as e:
        return compile_error(e)