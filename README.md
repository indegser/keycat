[![Netlify Status](https://api.netlify.com/api/v1/badges/367c332f-988f-41bf-8a1d-27a5d081af77/deploy-status)](https://app.netlify.com/sites/keycat/deploys)

# Philosophy

Too many apis for each blockchains.
I wanted to build universal wallet service, and the main painpoint was blockchains' different api structure.
Thus, I fixed keycatjs to support only four apis.

1. transact(sign & push transaction)
2. signTransaction
3. signArbitraryData
4. signin
