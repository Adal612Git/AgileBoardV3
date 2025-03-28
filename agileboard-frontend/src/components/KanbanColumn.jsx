function KanbanColumn({ title, children }) {
    return (
      <div className="bg-gray-100 rounded-lg p-4 w-full sm:w-1/3">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="space-y-2">{children}</div>
      </div>
    )
  }
  
  export default KanbanColumn
  