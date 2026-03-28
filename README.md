# SharePoint Dashboard Web Part

A modern **SharePoint Framework (SPFx)** client-side web part that visualizes data from any SharePoint list using **Chart.js**.

## Features

- **Dynamic Data Source**: Select any SharePoint list and multiple fields to visualize
- **Multiple Chart Types**:
  - Bar
  - Horizontal Bar
  - Line
  - Pie
  - Doughnut
- **Custom Color Palette**: Add, edit, and delete colors with a built-in color picker
- **Responsive Design**: Works well in SharePoint pages and Microsoft Teams
- **Dark Theme Support**: Automatically adapts to SharePoint/Teams theme
- **Live Refresh**: Refresh button to reload data without reloading the page
- **Property Pane Configuration** with dynamic list and field loading

## How It Works

1. Choose a **SharePoint List**
2. Select one or more **Fields** (first field is used as label, subsequent fields as data series)
3. Choose a **Chart Type** and set a **Title**
4. Customize the **color palette** for your datasets

The web part fetches items from the selected list and builds the chart dynamically.

## Technologies Used

- **SharePoint Framework (SPFx)** v1.14.0
- **React** 16.13.1
- **Chart.js** + **react-chartjs-2**
- **Office UI Fabric React** (now Fluent UI)
- **@pnp/spfx-property-controls** (for MultiSelect)
- Custom **Color Palette** property pane control

## Prerequisites

- Node.js LTS (recommended version for SPFx 1.14)
- SharePoint Framework development toolchain (`@microsoft/generator-sharepoint`)
- Access to a SharePoint Online site with a list containing data

## Installation & Deployment

### 1. Clone / Download the project

```bash
git clone https://github.com/syedshahidashiqali/spfx-dashboard
cd spfx-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Build and serve locally

```bash
gulp serve
```

### 4. Bundle and package for deployment

```bash
gulp bundle --ship
gulp package-solution --ship
```

The `.sppkg` file will be generated in the `sharepoint/solution` folder.

### 5. Deploy

- Upload the `.sppkg` to your organization's **App Catalog**
- Add the **Dash** web part to any modern SharePoint page or Teams tab

## Configuration

In the web part property pane you can configure:

- **List** → Select the source list
- **Selected Fields** → Choose fields (first = label, rest = data values)
- **Chart Type** → Bar, Horizontal Bar, Line, Pie, or Doughnut
- **Chart Title**
- **Colors** → Customizable color palette (add/edit/delete)

## Project Structure (Key Files)

```
src/
├── webparts/dash/
│   ├── DashWebPart.ts                 # Main web part class
│   ├── DashWebPart.manifest.json
│   └── components/
│       ├── Dash.tsx
│       ├── Chart.tsx                  # Chart rendering logic
│       └── Chart.module.scss
├── services/SharePoint/               # SharePoint REST service layer
├── controls/PropertPaneColorPalette/  # Custom color picker control
└── ...
```

## Known Limitations

- Only supports **numeric** or **countable** values for data series (non-numeric values may cause unexpected behavior)
- Field selection uses the first selected field as the category label
- Designed for relatively small lists (performance depends on list size)

## Contributing

Feel free to fork the project and submit pull requests for new features or bug fixes.

## License

This project is licensed under the MIT License.

---

**Built with ❤️ using SharePoint Framework**
