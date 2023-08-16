<?php
// The key must be 256 bits
$key = "12345678123456781234567812345678";

/* Use AES256 CBC mode to encrypt and decrypt
  For the supporting cipher, please check the function openssl_get_cipher_methods() */

/**
 * @return Array($cipher, $iv)
 */
function encrypt($original, $cipher = "aes-256-cbc")
{
  global $key;

  if (in_array($cipher, openssl_get_cipher_methods())) {
    // Declare the length of IV
    $ivlen = openssl_cipher_iv_length($cipher);

    // Generate random IV
    $iv = openssl_random_pseudo_bytes($ivlen);

    // Encrypt plaintext to ciphertext
    $cipher = openssl_encrypt($original, $cipher, $key, $options = 0, $iv, $tag);

    return array(
      "cipher" => $cipher,
      "iv" => $iv
    );
  }
}

function decrypt($ciphertext, $iv, $cipher = "aes-256-cbc") {
  global $key;

  return openssl_decrypt($ciphertext, $cipher, $key, $options = 0, $iv/* , $tag */);
}