import React from "react";
import stagiaireSlice from "../data/stagiaireSlice";

export default stagiaireSlice(){

    const dispatch = useDispatch();

    
    return(
        <div className='border p-3 bg-light d-flex justify-content-between align-items-center'>
        <div>
          <strong>{stagiaire.nom}</strong> - {stagiaire.prenom} - {stagiaire.age}
        </div>
        <button
          type='button'
          className='btn btn-danger'
          onClick={() => handleDeleteStagiaire(stagiaire.nom)}
        >
          Supprimer
        </button>
      </div>
    )
}