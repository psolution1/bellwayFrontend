import React, { useState } from "react";


function CreateCampaigns() {
  return (
    <div>
    <div className="content-wrapper">
        <section className="content py-5">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-12 col-md-12 col-xl-12">
                        <div className="CampaignsDetail-tab-wrapper">
                            <div className="d-flex justify-content-center align-items-center bg-light">
                                <div className="card shadow" style={{width: '100%'}}>
                                    <nav>
                                        <div className="nav-tabs-head">
                                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                                <button className="nav-link active" id="nav-tab-0" data-bs-toggle="tab" data-bs-target="#tab-0" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Add Campaigns</button>
                                            </div>
                                        </div>
                                    </nav>
                                    <div className="tab-content border bg-light" id="nav-tabContent">
                                        <div className="tab-pane fade active show" id="tab-0" role="tabpanel" aria-labelledby="nav-tab-0">
                                            
                                            <div className="row">
                                                <div className="col-md-6 col-xs-12">
                                                    <div className="row">
                                                        <div className="col-md-12 col-xs-12">
                                                            <h1 className="title-add">Campaign Details</h1>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12 col-xs-12">
                                                            <label htmlFor="full_name">Full Name <span className="text-danger">*</span> </label>
                                                            <div className="form-group">
                                                                <input 
                                                                    type="text" 
                                                                    name="full_name" 
                                                                    placeholder="Full Name" 
                                                                    classname="form-control" 
                                                                    style={{width:'100%', borderWidth:1, borderColor:'#d8d8d8', borderRadius:3, padding:'7px 10px'}} 
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12 col-xs-12">
                                                            <label htmlFor="">Work Flow <span className="text-danger">*</span> </label>
                                                            <div className="form-group">
                                                            <select
                                                                name=""
                                                                className="form-control"
                                                                style={{width:'100%', borderWidth:1, borderColor:'#d8d8d8', borderRadius:3, padding:'7px 10px'}} 
                                                            >
                                                                <option value="">None</option>
                                                                <option value="">Lead Generation</option>
                                                                <option value="">Custom</option>  
                                                            </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12 col-xs-12">
                                                            <label htmlFor="">Telephony <span className="text-danger">*</span> </label>
                                                            <div className="form-group">
                                                            <select
                                                                name=""
                                                                className="form-control"
                                                                style={{width:'100%', borderWidth:1, borderColor:'#d8d8d8', borderRadius:3, padding:'7px 10px'}} 
                                                            >
                                                                <option value="">Default</option> 
                                                            </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-md-6 col-xs-12">
                                                    <div className="row">
                                                        <div className="col-md-12 col-xs-12">
                                                            <h1 className="title-add">Campaign Settings</h1>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12 col-xs-12">
                                                            <label htmlFor="">Disposition <span className="text-danger">*</span> </label>
                                                            <div className="form-group">
                                                            <select
                                                                name=""
                                                                className="form-control"
                                                                style={{width:'100%', borderWidth:1, borderColor:'#d8d8d8', borderRadius:3, padding:'7px 10px'}} 
                                                            >
                                                                <option value="">Interested</option>
                                                                <option value="">Not Interested</option>
                                                                <option value="">Callback</option>  
                                                                <option value="">Not Answering</option>
                                                                <option value="">Not Reachable</option>  
                                                            </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12 col-xs-12">
                                                            <label htmlFor="">Additional Fields <span className="text-danger">*</span> </label>
                                                            <div className="form-group">
                                                            <select
                                                                name=""
                                                                className="form-control"
                                                                style={{width:'100%', borderWidth:1, borderColor:'#d8d8d8', borderRadius:3, padding:'7px 10px'}} 
                                                            >
                                                                <option value="">Call Prospect immediately after adding manually</option> 
                                                            </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-12 col-xs-12 pt-3 pb-4">
                                                    <div className="row text-center">
                                                        <div className="col-md-12 col-xs- max-auto py-10 pt-10 ">
                                                        <input
                                                            type="submit"
                                                            value="SAVE"
                                                            style={{ marginRight: "10px" }}
                                                            className="button-57 bg_buttonsd"
                                                        />
                                                        <input
                                                            type="submit"
                                                            value="CANCEL"
                                                            className="button-57 buttons_sdsre"
                                                        />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>
  );
}

export default CreateCampaigns;
