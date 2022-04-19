package com.ifes.service.service;

import com.fasterxml.jackson.core.json.JsonReadContext;
import org.apache.tomcat.util.json.JSONParser;

import java.io.*;
import java.net.*;

public class MicroterminalService {

    private int port = 1001;
    private Socket socket = null;
    private ServerSocket serverSocket = null;
    private BufferedInputStream bis = null;
    private DataInputStream dis = null;
    private static final String message = "Insira o codigo de barras do produto: ";

    public MicroterminalService() {
        try {
            serverSocket = new ServerSocket(port);
            System.out.println("Server started on port " + serverSocket.getLocalPort() + "...");
            System.out.println("Waiting for client...");

            socket = serverSocket.accept();
            System.out.println("Client " + socket.getRemoteSocketAddress() + " connected to server...");

            bis = new BufferedInputStream(socket.getInputStream());
            dis = new DataInputStream(bis);

            while (true) {
                try {
                    DataOutputStream dos = new DataOutputStream(socket.getOutputStream());
                    BufferedReader in =                                          // 3rd statement
                            new BufferedReader(
                                    new InputStreamReader(socket.getInputStream()));
                    var line = in.readLine();
                    if(line != null) {
                        System.out.println(line);
                        limparTerminal(dos);
                        String response = getProductByBarCode(line);
                        dos.writeUTF(response);
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                    break;
                }
            }
            dis.close();
            socket.close();
            System.out.println("Client " + socket.getRemoteSocketAddress() + " disconnect from server...");
        } catch (IOException e) {
            System.out.println("Error : " + e);
        }
    }

    private String getProductByBarCode(String barcode) throws IOException {
        var urlBarCode = new URL("http://localhost:8080/api/product/bar-code/terminal/" + barcode);
        HttpURLConnection con = (HttpURLConnection) urlBarCode.openConnection();
        con.setRequestMethod("GET");
        con.setDoOutput(true);
        try{
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            con.disconnect();
            return content.toString();
        }
        catch (Exception e) {
            return "Erro ao buscar produto";
        }
    }

    private void limparTerminal(DataOutputStream dos) throws IOException {
        for (var i = 0; i < 4; i++) {
            dos.writeUTF("******************");
        }
    }

    public static void main(String args[]) {
       MicroterminalService server = new MicroterminalService();
    }
}