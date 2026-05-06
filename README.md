# Dimond Script - Sales & Sourcing Management System

**Dimond Script** is a premium, scalable React admin dashboard designed to streamline product sourcing from Alibaba and manage the full B2B/B2C order lifecycle. The platform bridges the gap between Sales, Procurement, and Finance departments, providing real-time visibility into order statuses and operational workflows.

## 🚀 Key Features

* **Sales-to-Procurement Lifecycle**: A fully mocked, state-driven workflow where Sales reps can create Client Orders that instantly hand-off to the Procurement team's queue.
* **Finance & Invoice Approvals**: Dedicated Finance module to review and approve sales invoices. Features dynamic, professional PDF receipt generation using `jspdf`.
* **Alibaba Sourcing Hub**: Specialized procurement tools to track Alibaba suppliers, manage contact details, calculate lead times, and view supplier ratings.
* **Product Catalog & CRM**: Full mocked CRUD interfaces for managing product categories, inventory, and customer directories.
* **Global State Management**: React Context API (`OrderContext`, `UserContext`) securely handles and syncs the mock-PostgreSQL order states across different departments.
* **Premium Modern UI**: Built with a sleek, responsive design featuring glassmorphism elements, CSS-variable theming, `Recharts` data visualization, and `lucide-react` iconography.

## 🛠️ Tech Stack

* **Frontend Framework**: React 18 + Vite
* **Language**: TypeScript
* **Styling**: Vanilla CSS (Custom Design System, Flexbox/Grid)
* **Data Visualization**: Recharts
* **PDF Generation**: jsPDF + jsPDF-AutoTable
* **Icons**: Lucide React

## 📦 Getting Started

### Prerequisites
Make sure you have Node.js installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mrk-infosec/React_Admin_Dashboard.git
   cd "React Admin Dashboard"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 🏗️ Architecture & Workflows

An order in Dimond Script moves through a strict state machine:
1. **`DRAFT`** -> **`PENDING_SOURCING`**: Sales submits an order, sending it to Procurement.
2. **`SOURCING_IN_PROGRESS`**: Procurement purchases stock from an Alibaba Supplier.
3. **`IN_TRANSIT`** -> **`RECEIVED_IN_WAREHOUSE`** -> **`READY_TO_SHIP`**
4. **`DELIVERED`**: Final state.

Simultaneously, the **Invoice State Machine** allows the Finance Department to approve generated orders before a formal PDF is released to the customer.
