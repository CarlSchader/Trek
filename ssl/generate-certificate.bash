# openssl genrsa -out key.pem
# openssl req -new -key key.pem -out csr.pem
# openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
# rm csr.pem

openssl genpkey -algorith RSA -outform PEM -pkeyopt rsa_keygen_bits:4096