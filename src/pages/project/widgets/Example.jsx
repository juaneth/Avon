import AltRouteIcon from "@mui/icons-material/AltRoute";

export function ExampleWidget() {
  return (
    <div
      className='grid-stack-item p-4 bg-white/5'
      data-gs-width='8'
      data-gs-height='5'
    >
      <div className='grid-stack-item-content'>
        <h1 className='text-lg'> Example Widget</h1>
      </div>
    </div>
  );
}

export function ExampleButton({ widgets, setWidgets }) {
  return (
    <div
      onClick={() => {
        let newWidgetList = [...widgets];

        newWidgetList.push(ExampleWidget);

        setWidgets(newWidgetList);
      }}
      className='btn btn-square btn-ghost bordered-all'
    >
      <AltRouteIcon></AltRouteIcon>{" "}
    </div>
  );
}
