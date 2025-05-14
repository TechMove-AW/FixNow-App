workspace "FixIt - Angular/Spring Boot Stack Edition" "Software architecture diagrams for the FixIt application" {

  model {
    # People
    client = person "Client" "User who searches for, contacts, and hires technicians for specific services."
    technician = person "Technician" "Professional offering specific services (e.g., plumbing, electrical work)."

    # Software System
    FixIt = softwareSystem "FixIt" "A platform that connects clients with technicians for home and specialized services. It allows managing profiles, requests, payments, and service ratings." {
      
      # Containers
      webApplication = container "Web Application" "Serves static content and loads the Single Page Application (SPA)." "Angular, TypeScript"

      singlePageApplication = container "Single Page Application" "User interface for clients and technicians to search technicians, view profiles, send service requests, chat, and manage services." "TypeScript, Angular, Angular Material" {
        tags "Web Browser"
      }

      apiApplication = container "API Application" "Handles the business logic and exposes RESTful APIs for user management, service requests, profiles, payments, and more." "Spring Boot, Java" {
        tags "API"
      }

      database = container "Database" "Stores data about users, technicians, services, requests, history, and payment methods." "MySQL Server" {
        tags "Database"
      }
    }

    # Relationships between people and system
    client -> FixIt "Search for technicians, send service requests, and rate services"
    technician -> FixIt "Manage profile, accept/reject requests, and offer services"

    # Relationships between containers
    client -> webApplication "Accesses via http://localhost:4200" "HTTP"
    technician -> webApplication  "Accesses via http://localhost:4200" "HTTP"

    webApplication -> singlePageApplication "Loads and delivers the SPA to the user's browser"

    singlePageApplication -> apiApplication "Sends API requests to" "JSON/HTTPS" "REST API"

    apiApplication -> database "Reads and writes data to" "Spring Data JPA"
  }

  views {
    systemContext FixIt "SystemContext" "The system context diagram for the FixIt platform" {
      include *
      autoLayout lr
    }

    container FixIt "Containers" "The container diagram for the FixIt platform" {
      include *
      autoLayout lr
    }

    styles {
      element "Person" {
        shape "Person"
        background "#08427b"
        color "#ffffff"
      }
      element "Software System" {
        background "#1168bd"
        color "#ffffff"
      }
      element "Container" {
        background "#438dd5"
        color "#ffffff"
      }
      element "Web Browser" {
        shape "WebBrowser"
        background "#438dd5"
        color "#ffffff"
      }
      element "API" {
        background "#438dd5"
        color "#ffffff"
      }
      element "Database" {
        shape "Cylinder"
        background "#438dd5"
        color "#ffffff"
      }
    }

    theme default
  }

  properties {
    structurizr.groupSeparator "/"
  }
}
