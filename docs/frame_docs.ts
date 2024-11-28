// Frame format:

//       0                   1                   2                   3
//       0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
//      +-+-+-+-+-------+-+-------------+-------------------------------+
//      |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
//      |I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
//      |N|V|V|V|       |S|             |   (if payload len==126/127)   |
//      | |1|2|3|       |K|             |                               |
//      +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
//      |     Extended payload length continued, if payload len == 127  |
//      + - - - - - - - - - - - - - - - +-------------------------------+
//      |                               |Masking-key, if MASK set to 1  |
//      +-------------------------------+-------------------------------+
//      | Masking-key (continued)       |          Payload Data         |
//      +-------------------------------- - - - - - - - - - - - - - - - +
//      :                     Payload Data continued ...                :
//      + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
//      |                     Payload Data continued ...                |
//      +---------------------------------------------------------------+

// First byte:
//   bit 0: FIN
//   bit 1: RSV1
//   bit 2: RSV2
//   bit 3: RSV3
//   bits 4-7 OPCODE
//   Bytes 2-10: payload length (see Decoding Payload Length)
//   If masking is used, the next 4 bytes contain the masking key (see Reading and unmasking the data)
//   All subsequent bytes are payload


// ws-frame                = frame-fin           ; 1 bit in length
//                           frame-rsv1          ; 1 bit in length
//                           frame-rsv2          ; 1 bit in length
//                           frame-rsv3          ; 1 bit in length
//                           frame-opcode        ; 4 bits in length
//                           frame-masked        ; 1 bit in length
//                           frame-payload-length   ; either 7, 7+16,
//                                                 ; or 7+64 bits in
//                                                 ; length
//                           [ frame-masking-key ]  ; 32 bits in length
//                           frame-payload-data     ; n*8 bits in
//                                                 ; length, where
//                                                 ; n >= 0

// frame-fin               = %x0 ; more frames of this message follow
//                         / %x1 ; final frame of this message
//                             ; 1 bit in length

// frame-rsv1              = %x0 / %x1
//                           ; 1 bit in length, MUST be 0 unless
//                           ; negotiated otherwise

// frame-rsv2              = %x0 / %x1
//                           ; 1 bit in length, MUST be 0 unless
//                           ; negotiated otherwise

// frame-rsv3              = %x0 / %x1
//                           ; 1 bit in length, MUST be 0 unless
//                           ; negotiated otherwise

// frame-opcode            = frame-opcode-non-control /
//                           frame-opcode-control /
//                           frame-opcode-cont

// frame-opcode-cont       = %x0 ; frame continuation

// frame-opcode-non-control = %x1 ; text frame
//                           / %x2 ; binary frame
//                           / %x3-7
//                           ; 4 bits in length,
//                           ; reserved for further non-control frames

// frame-opcode-control    = %x8 ; connection close
//                         / %x9 ; ping
//                         / %xA ; pong
//                         / %xB-F ; reserved for further control
//                               ; frames
//                               ; 4 bits in length
