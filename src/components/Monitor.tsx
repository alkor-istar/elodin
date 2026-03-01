type MonitorProps = {
  selectedImageNumber?: number;
  imageWidth?: number;
  imageHeight?: number;
};

const formatValue = (value?: number) => {
  if (value === undefined) return "--";
  return value.toString();
};

const Monitor = ({
  selectedImageNumber,
  imageWidth,
  imageHeight,
}: MonitorProps) => {
  return (
    <div className="mt-1 rounded border border-slate-500 bg-slate-800 px-2 py-1 text-xs text-slate-200">
      <div>Image: {formatValue(selectedImageNumber)}</div>
      <div>
        Size: {formatValue(imageWidth)} x {formatValue(imageHeight)}
      </div>
    </div>
  );
};

export default Monitor;
