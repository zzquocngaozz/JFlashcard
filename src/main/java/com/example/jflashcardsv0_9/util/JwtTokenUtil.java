package com.example.jflashcardsv0_9.util;

import com.example.jflashcardsv0_9.model.TokenPayload;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtTokenUtil {
    private final Key secretKey;

    public JwtTokenUtil() {
        // Tạo khóa chữ ký bằng cách sử dụng Keys.secretKeyFor
        this.secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    }

    public String generateToken(TokenPayload tokenPayload, long expiredDate) {
        return Jwts.builder()
                .claim("payload", tokenPayload)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiredDate * 1000))
                .signWith(secretKey, SignatureAlgorithm.HS512)
                .compact();
    }

    public TokenPayload getTokenPayload(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody();

            Map<String, Object> payload = claims.get("payload", Map.class);

            return TokenPayload.builder()
                    .userId((int) payload.get("userId"))
                    .username((String) payload.get("username"))
                    .build();
        } catch (JwtException e) {
            // Handle exception, token is invalid or expired
            return null;
        }
    }

    public boolean isValid(String token, TokenPayload tokenFromUser) {
        TokenPayload tokenPayload = getTokenPayload(token);

        if (tokenPayload == null) {
            return false;
        }

        return tokenPayload.getUserId() == tokenFromUser.getUserId()
                && tokenPayload.getUsername().equals(tokenFromUser.getUsername())
                && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody();

            Date expirationDate = claims.getExpiration();
            return expirationDate.before(new Date());
        } catch (JwtException e) {
            // Token không hợp lệ, có thể do đã hết hạn hoặc chứa lỗi khác
            return true; // Hoặc bạn có thể xử lý theo cách khác tùy ý
        }
    }

}

