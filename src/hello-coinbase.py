############################################################
# Module  : None
# Date    : December 22nd, 2017
# Author  : Xiao Ling
# To run  : run hello-coinbase.py
############################################################


from coinbase.wallet.client import Client


client        = Client( 'L7QaKyIVT8BN1xRO'
	                  , 'RO8aTcFFI08l46fpwSbZgBs2wK6H0C9e'
	                  , api_version='2017-12-22'
	                  )
currency_code = "USD"
price         = client.get_spot_price(currency=currency_code)


print('Current bitcoin price in %s: %s' % (currency_code, price.amount))