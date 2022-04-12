package com.ifes.service.service;

import com.ifes.service.service.dto.ProductEditDTO;
import lombok.RequiredArgsConstructor;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;

@RequiredArgsConstructor
public class MicroterminalService {
    String clientSentence;
    String capitalizedSentence;
    private final ProductService productService;

    public void connect() throws IOException {
        ServerSocket welcomeSocket = new ServerSocket(6789);
        while (true) {
            Socket connectionSocket = welcomeSocket.accept();
            BufferedReader inFromClient = new BufferedReader(new InputStreamReader(connectionSocket.getInputStream()));
            DataOutputStream outToClient = new DataOutputStream(connectionSocket.getOutputStream());
            clientSentence = inFromClient.readLine();

            if(clientSentence != null) {
                ProductEditDTO product = productService.getByBarCode(clientSentence);
                capitalizedSentence = product.getDescription().concat(" - R$").concat(product.getSalePrice().toString());
                outToClient.writeBytes(capitalizedSentence);
            }

        }
    }
}
