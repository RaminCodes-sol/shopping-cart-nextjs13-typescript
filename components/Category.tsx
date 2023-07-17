'use client'

type Props = {
  setCategory: React.Dispatch<React.SetStateAction<string>>
}


const Category = ({ setCategory }: Props) => {
  const categories =["all", "men's clothing", "jewelery", "electronics", "women's clothing" ]

  return (
    <div className="w-full flex flex-wrap gap-3 p-3">
      {
        categories.map(category => <button key={category} onClick={() => setCategory(category)} className="bg-purple-600 px-4 py-2 rounded-md transition-colors hover:bg-purple-800 text-sm">{category}</button>)
      }
    </div>
  )
}

export default Category