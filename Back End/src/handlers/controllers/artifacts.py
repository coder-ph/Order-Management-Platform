### User Artifacts
user_creation_art = ['email', 'password', 'first_name', 'last_name', 'phone_no', 'location.lattitude', 'location.longitude']
user_login_art = ['email', 'password']
user_password_update_art = [ 'password', 'new_password']
user_token_request_art = ['key']
user_token_verification_art = ['key', 'token']

## Products artifacts
category_creation_art = ['name']
product_creation_art = ['name', 'price','description','category', 'store']
product_updates_art = ['name', 'price','description','category']

## Store artifacts
store_creation_art = ['name', 'description',  'location.lattitude', 'location.longitude']
change_store_status_art = ['id', 'status']