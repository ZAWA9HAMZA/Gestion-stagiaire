// affichage.js

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addStagiaire, deleteStagiaire, updateStagiaire, deleteAllStagiaires } from '../data/stagiaireSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons';

export default function Affichage() {
  const dispatch = useDispatch();
  const stagiaires = useSelector((state) => state.stagiaires);
  const [newStagiaire, setNewStagiaire] = useState({ nom: '', prenom: '', age: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStagiaire({ ...newStagiaire, [name]: value });
  };

  const handleEditStagiaire = (stagiaire) => {
    setNewStagiaire(stagiaire);
    setIsEditing(true);
  };

  const handleDeleteStagiaire = (nom) => {
    dispatch(deleteStagiaire(nom));
    checkDeleteAllButtonActivation();
  };

  const handleDeleteAllStagiaires = () => {
    dispatch(deleteAllStagiaires());
    checkDeleteAllButtonActivation();
  };

  const handleAddStagiaire = () => {
    if (isEditing) {
      dispatch(updateStagiaire(newStagiaire));
      setIsEditing(false);
      setSuccessMessage('Stagiaire modifié avec succès !');
    } else {
      dispatch(addStagiaire({ ...newStagiaire, isUpdated: false }));
      setSuccessMessage('Stagiaire ajouté avec succès !');
    }

    setNewStagiaire({ nom: '', prenom: '', age: '' });

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);

    checkDeleteAllButtonActivation();
  };

  const handleUpdateField = (fieldName, value) => {
    setNewStagiaire((prevStagiaire) => ({
      ...prevStagiaire,
      [fieldName]: value,
    }));
  };

  const checkDeleteAllButtonActivation = () => {
    const deleteAllButton = document.getElementById('deleteAllButton');
    if (deleteAllButton) {
      deleteAllButton.disabled = stagiaires.length === 0;
    }
  };

  return (
    <div className='container mt-4 text-center'>
      <h1 className='mb-4'>AJOUTER UN STAGIAIRE :</h1>
      <div className='mt-4 border p-3 border-primary border-2 font-weight-bold'>
        {successMessage && (
          <div className='alert alert-success' role='alert'>
            {successMessage}
          </div>
        )}
        <div className='mb-3'>
          <h2>{isEditing ? 'Modifier' : 'Ajouter'} un stagiaire :</h2>
        </div>
        <form>
          <div className='mb-3'>
            <label htmlFor='nom' className='form-label'>
              Nom :
            </label>
            <input
              type='text'
              className='form-control'
              id='nom'
              name='nom'
              value={newStagiaire.nom}
              onChange={handleInputChange}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='prenom' className='form-label'>
              Prénom :
            </label>
            <input
              type='text'
              className='form-control'
              id='prenom'
              name='prenom'
              value={newStagiaire.prenom}
              onChange={handleInputChange}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='age' className='form-label'>
              Âge :
            </label>
            <input
              type='number'
              className='form-control'
              id='age'
              name='age'
              value={newStagiaire.age}
              onChange={handleInputChange}
            />
          </div>
          <button type='button' className='btn btn-primary' onClick={handleAddStagiaire}>
            {isEditing ? (
              <>
                <box-icon type='solid' name='save' color='white'></box-icon> Enregistrer
              </>
            ) : (
              <>
                <box-icon type='solid' name='user-plus' color='white'></box-icon> Ajouter
              </>
            )}
          </button>
        </form>
        <div className='row mt-4'>
          {stagiaires.map((stagiaire, index) => (
            <div key={index} className='col-md-4 mb-4'>
              <div className={`card ${stagiaire.isUpdated ? 'border-danger' : ''}`}>
                <div className='card-body'>
                  <h5 className='card-title'>{stagiaire.nom} {stagiaire.prenom}</h5>
                  <p className='card-text'>Âge: {stagiaire.age}</p>
                  <div className='d-flex justify-content-between'>
                    <button
                      type='button'
                      className='btn btn-warning'
                      onClick={() => handleEditStagiaire(stagiaire)}
                    >
                      Modifier
                    </button>
                    <button
                      type='button'
                      className='btn btn-danger'
                      onClick={() => handleDeleteStagiaire(stagiaire.nom)}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='mt-4'>
          <button
            type='button'
            className='btn btn-danger'
            onClick={handleDeleteAllStagiaires}
            id='deleteAllButton'
            disabled={stagiaires.length === 0}
          >
            Supprimer tous les stagiaires
          </button>
        </div>
      </div>
    </div>
  );
}
