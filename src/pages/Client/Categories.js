import React,{useEffect} from 'react';
import { ListCategories } from '../../components/Client/ListCategories/ListCategories';
import { useCategory } from '../../hooks';

export function Categories() {
  const {loading,categories,getCategories} = useCategory()

  useEffect(()=>{
    getCategories()
  },[])
  return (
    <div>
        <h3>Categorias</h3>
        {loading ? (<p>Cargando...</p>) : (
          <ListCategories categories={categories}/>
        )}
    </div>
    )
}
