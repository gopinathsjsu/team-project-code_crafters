import React from "react";

const FutureProjectsPage = () => {
    return (
        <div style={{ textAlign: "center" }}>
            <h1 style={{ marginBottom: "40px" }}>Future Projects</h1>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ maxWidth: "600px" }}>
                    <h2>New Branch in Downtown</h2>
                    <img
                        src="https://www.telegraph.co.uk/content/dam/Travel/hotels/north-america/san-francisco/w-hotel-san-francisco-gym-united-states-p.jpg"
                        alt="New Branch in Downtown"
                        style={{ width: "100%", marginTop: "20px", marginBottom: "20px", border: "solid 2px #333" }}
                    />
                    <p style={{ marginBottom: "20px" }}>We are excited to announce that we will be opening a new branch in Downtown this summer!</p>

                    <h2>State-of-the-Art Equipment</h2>
                    <img
                        src="https://d33hncv3fqajvb.cloudfront.net/LDmVa1xLh6tl7cDCpBo_Yf4rBZM=/1600x0/filters:quality(70)/location_photos/data/11128/original/fitness-20sf-20castro-1466256225.jpg"
                        alt="State-of-the-Art Equipment"
                        style={{ width: "100%", marginTop: "20px", marginBottom: "20px", border: "solid 2px #333" }}
                    />
                    <p>We are investing in the latest fitness equipment to ensure that our members have access to the best tools to achieve their fitness goals.</p>
                    <h2>Olympic Pool</h2>
                    <img
                        src="https://fillmoreshop.com/assets/img/stores/fitness-sf/fitness-sf-01.jpg"
                        alt="New Branch in Downtown"
                        style={{ width: "100%", marginTop: "20px", marginBottom: "20px", border: "solid 2px #333" }}
                    />
                    <p style={{ marginBottom: "20px" }}>We are excited to announce that we will be opening a Olympic Pool this summer!</p>

                </div>
            </div>
        </div>
    );
};

export default FutureProjectsPage;
