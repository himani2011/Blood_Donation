import React from 'react'

const FAQ = () => {

    const styles= {
      preTag: {
        fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif',
        whiteSpace:'pre-wrap',
        marginTop: '5px',
        fontSize:'15px'
      },
    };

    const headerStyles= {
      header: {
        fontSize:'20px'
      },
    };

  return (
    <div>
      <section className="faq" style={{paddingLeft: 20}}>
    <h2 className='h2-faq' style={{marginTop:"100px",marginBottom:"20px",inlineSize: "470px",backgroundColor:"#84B0B0",border:"2px solid",borderColor:"#888A8A",textAlign:"center" }}>Frequently Asked Questions</h2>

    <div class="faq-container" style={{border:"2px solid",borderColor:"#888A8A",justifyContent:"flex-start",inlineSize:"1250px",backgroundColor:"rgba(177, 186, 145, 0.8)",textAlign:"justify",padding:"10px"}}>
      <details class="faq-box" open>
        <summary class="faq-header" style={headerStyles.header}> 
        <b>How  often one can donate the blood?</b>
        </summary>
        <div class="faq-content">
          <pre style={styles.preTag}>
               
            The frequency at which one can donate blood depends on the guidelines and regulations set by the specific blood donation organization 
            or blood bank. In general, most blood donation centers adhere to the following guidelines:
            
            1. Whole Blood Donation: For whole blood donation, the standard waiting period between donations is usually 8 weeks (56 days). This 
                waiting period allows your body to replenish the lost blood and ensures your overall health and well-being are not compromised.

            2. Platelet Donation: Platelet donations can be done more frequently than whole blood donations because the body replenishes 
                platelets more quickly. The typical waiting period for platelet donation is at least 7 days, but some centers may allow 
                more frequent donations depending on the donor's platelet count and overall health.

            3. Double Red Cell Donation: Double red cell donation involves the collection of two units of red blood cells while returning most of 
                the plasma and platelets to the donor. The waiting period for double red cell donation is usually longer, around 16 weeks (112 days).
    
          </pre>
        </div>
      </details>

      <details class="faq-box">
        <summary class="faq-header" style={headerStyles.header}>
        <b>What causes frequent blood donation?</b>
        </summary>
        <div class="faq-content">
        <pre style={styles.preTag}>
        It's essential to follow the guidelines set by the blood donation organization to ensure your safety and the quality of the blood supply. 
        Donating blood too frequently can lead to anemia and other health issues, so it's crucial to give your body enough time to recover between donations.
        If you're interested in becoming a regular blood donor, you can check with your local blood donation center or organization for their specific 
        guidelines on donation frequency. They will provide you with all the necessary information and answer any questions you may have about the donation process.        
        </pre>
        </div>
      </details>

    </div>
  </section>

    </div>
  )
}

export default FAQ
