# QuakeLook: Global Earthquake & Weather Visualizer

![QuakeLook Screenshot](https://raw.githubusercontent.com/nikhilesh-attal/QuakeLook/main/public/QuakeLook.png)

QuakeLook is an interactive web application that provides real-time visualization of earthquake data and live weather forecasts from around the globe. Built with Next.js, React, and Leaflet, it offers a user-friendly interface to explore recent seismic events, check weather conditions, and stay informed about our dynamic planet.

## ✨ Key Features

- **Interactive World Map:** A dynamic, zoomable map showing the latest earthquakes across the globe using Leaflet.js.
- **Real-Time Data:** Fetches the latest 24-hour earthquake data from the U.S. Geological Survey (USGS) API.
- **Live Weather Forecasts:** Get current weather conditions, hourly forecasts, and sunrise/sunset times for any city in the world.
- **Magnitude Filtering & List View:** Easily filter quakes by magnitude and browse them in a sorted list that interacts with the map.
- **Detailed Popups:** Click on any earthquake marker to see its precise location, magnitude, and the time it occurred.
- **Responsive Design:** A clean and modern UI that works seamlessly on both desktop and mobile devices.
- **Built with Next.js:** Leverages the power of the Next.js App Router for optimal performance and a great developer experience.

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
- **Mapping:** [React-Leaflet](https://react-leaflet.js.org/)
- **Charting:** [Recharts](https://recharts.org/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🌐 Data Source

This project uses live data feeds from two primary sources:
- **Earthquake Data:** [USGS Earthquake Hazards Program](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
- **Weather & Geocoding Data:** [Open-Meteo API](https://open-meteo.com/)

## 📦 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 18 or later recommended)
- `npm` or `yarn`

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/nikhilesh-attal/QuakeLook.git
    cd QuakeLook
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Run the development server:**
    ```sh
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
QuakeLook/
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── about/          # About page
│   │   ├── map/            # Earthquake map page
│   │   ├── weather/        # Weather forecast page
│   │   └── page.tsx        # Home page
│   ├── components/         # Reusable React components
│   │   ├── ui/             # ShadCN UI components
│   │   └── ...             # Header, Footer, Map, etc.
│   └── lib/                # Helper functions and types
│       ├── data.ts         # Data fetching logic
│       └── types.ts        # TypeScript types
├── public/                 # Static assets
└── package.json            # Project dependencies
```

## 🙏 Acknowledgements

- Data provided by the [U.S. Geological Survey](https://www.usgs.gov/) and [Open-Meteo](https://open-meteo.com/).
- Built with inspiration from the data visualization community.
