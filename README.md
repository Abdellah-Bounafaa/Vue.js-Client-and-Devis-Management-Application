# Vue.js Client and Devis Management Application

## Description

This project is a Vue.js application designed to manage clients and devis. It provides functionalities to view, create, and delete clients and devis. The application leverages Vue Router for navigation and Axios for API requests.

## Features

- **Clients Management**
  - View a list of clients
  - Add a new client
  - Delete a client
- **Devis Management**
  - View a list of devis
  - Add a new devis
  - Delete a devis

## Setup

### Prerequisites

- Node.js (>= 12.x)
- npm (>= 6.x) or yarn (>= 1.x)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   
2. Install dependencies:
   npm install
   # or
   yarn install
   
3. Start the development server:
   npm run serve
   # or
   yarn serve

# Usage

## Clients
- **View Clients**: Navigate to the "Clients" page to view a list of clients.
- **Add Client**: Click the "+" button to open a modal and fill in the client details.
- **Delete Client**: Click the trash icon next to a client to delete it.

## Devis
- **View Devis**: Navigate to the "Devis" page to view a list of devis.
- **Add Devis**: Click the "+" button to open a modal and fill in the devis details.
- **Delete Devis**: Click the trash icon next to a devis to delete it.

## Screenshots

### Clients List
![Clients List](path_to_clients_list_screenshot)

### Devis List
![Devis List](path_to_devis_list_screenshot)

### Add Devis Modal
![Add Devis Modal](path_to_add_devis_modal_screenshot)

### Add Client Modal
![Add Client Modal](path_to_add_client_modal_screenshot)

# Project Structure

src/
├── assets/
│   ├── clients.css
│   └── devis.css
├── components/
│   ├── ClientList.vue
│   └── DevisList.vue
├── data/
│   └── axiosInstance.js
├── views/
│   ├── ClientList.vue
│   └── DevisList.vue
├── [App.vue](http://_vscodecontentref_/#%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22c%3A%5C%5CUsers%5C%5Cposte%5C%5Ctest%5C%5Cfront_end%5C%5Csrc%5C%5CApp.vue%22%2C%22_sep%22%3A1%2C%22external%22%3A%22file%3A%2F%2F%2Fc%253A%2FUsers%2Fposte%2Ftest%2Ffront_end%2Fsrc%2FApp.vue%22%2C%22path%22%3A%22%2FC%3A%2FUsers%2Fposte%2Ftest%2Ffront_end%2Fsrc%2FApp.vue%22%2C%22scheme%22%3A%22file%22%7D%7D)
├── main.js
└── router.js
