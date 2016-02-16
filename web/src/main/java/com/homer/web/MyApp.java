package com.homer.web;

import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.server.ResourceConfig;

import javax.ws.rs.core.Application;
import java.net.URI;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by arigolub on 2/15/16.
 */
public class MyApp  {

    public static void main(String[] args) {
        // Base URI the Grizzly HTTP server will listen on
        String BASE_URI = "http://localhost:1234/";

        // create a resource config that scans for JAX-RS resources and providers
        // in com.example.rest package
        final ResourceConfig rc = new ResourceConfig().packages("com.homer.web");
        rc.register(JacksonFeature.class);

        // create and start a new instance of grizzly http server
        // exposing the Jersey application at BASE_URI
        GrizzlyHttpServerFactory.createHttpServer(URI.create(BASE_URI), rc);

    }
}
