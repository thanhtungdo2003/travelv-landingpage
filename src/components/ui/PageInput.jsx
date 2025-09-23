import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "./Button";

const PageInput = ({ page, max, onChange }) => {
  const [p, setPage] = useState(page || 1);

  useEffect(() => {
    setPage(page);
  }, [page]);

  const updatePage = (newPage) => {
    if (newPage < 1 || newPage > max || newPage === p) return;
    setPage(newPage);
    onChange?.(newPage);
  };

  const renderPageBtn = (value) => {
    if (value < 1 || value > max) return null;
    return (
      <input
        style={{
          width: "30px",
          height: "30px",
          textAlign: "center",
          fontSize: "12px",
          backgroundColor: "#d8e6efff",
          border: "1px solid #c7c7c7ff",
          borderRadius: "50%",
          outline: "none",
          color: "black",
          cursor: value === p ? "default" : "pointer",
          opacity: value === p ? 1 : 1,
        }}
        type="button"
        disabled={value === p}
        value={value}
        onClick={() => updatePage(value)}
      />
    );
  };

  return (
    <div className="page-control" style={{ display: "flex", gap: "4px" }}>
      <Button
        onClick={() => updatePage(p - 1)}
        iconLeft={<ChevronLeft color="black" />}
        border={"none"}
        disabled={p === 1}
      />

      {renderPageBtn(p - 2)}
      {renderPageBtn(p - 1)}

      {/* current page */}
      <input
        value={p}
        disabled
        style={{
          width: "30px",
          height: "30px",
          textAlign: "center",
          fontSize: "12px",
          backgroundColor: "#5798c3ff",
          border: "1px solid #3275b4ff",
          borderRadius: "50%",
          outline: "none",
          color: "white",
        }}
      />

      {renderPageBtn(p + 1)}
      {renderPageBtn(p + 2)}

      <Button
        onClick={() => updatePage(p + 1)}
        iconLeft={<ChevronRight color="black" />}
        color={"#666"}
        border={"none"}
        disabled={p === max}
      />
    </div>
  );
};

export default PageInput;
