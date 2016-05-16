/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dhenton9000.download.servlets;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;

/**
 *
 * @author dhenton
 */
public class DownloadServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        ServletContext context = this.getServletContext();
        String fullPath = context.getRealPath("xls/TestData.xls");
        System.out.println("starting");

        String contentType = request.getHeader("Content-Type");
        //contentType == null is a simple GET click

        if (contentType == null || contentType.equals("application/json")) {

            StringBuilder buffer = new StringBuilder();
            BufferedReader reader = request.getReader();
            String line;
            while ((line = reader.readLine()) != null) {
                buffer.append(line);
            }
            String data = buffer.toString();
            System.out.println("data is "+data);
            String fileExt= "alpha";
            if (data.indexOf("1") > 0)
            {
                fileExt = "beta";
            }
            
            File file = null;
            InputStream in = null;
            OutputStream outstream = null;
            try {
                response.reset();
                file = new File(fullPath);
                in = new FileInputStream(file);
                response.setContentType("application/vnd.ms-excel");
                response.addHeader("content-disposition", "attachment; filename=data"+fileExt+".xls");
                outstream = response.getOutputStream();
                IOUtils.copyLarge(in, outstream);
                response.flushBuffer();
                System.out.println("finished");
            } catch (Exception e) {
                System.out.println("Unable to download file " + e.getMessage());
            } finally {
                IOUtils.closeQuietly(outstream);
                IOUtils.closeQuietly(in);

            }
        } else {

            throw new ServletException("Content must be 'application/json'");

        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
