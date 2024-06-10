import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; 

const PdfGenerator = ({ transactions }) => {

    const generatePDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["date", "Quantité", "Prix Total", "Ressource", "Employé"];
        const tableRows = [];
        
       
        transactions.forEach(transaction => {
          const transactionData = [
            transaction.date,
            transaction.Quantité,
            transaction["Prix Total"],
            transaction.Ressource,
            transaction.Employé
          ];
          tableRows.push(transactionData);
        });
    
        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        doc.save('transactions.pdf');
      };
    

  return (
    <div>
      <button onClick={generatePDF}>Générer PDF</button>
    </div>
  );
};

export default PdfGenerator;
