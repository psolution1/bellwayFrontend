import React, { useState } from "react";


function Dashboard() {
  return (
    <div>
        <div className="content-wrapper">
            <section className="content py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-12 col-md-12 col-xl-12">
                            <div className="dashboard-tab-wrapper">
                                <div className="d-flex justify-content-center align-items-center bg-light">
                                    <div className="card shadow" style={{width: '100%'}}>
                                        <nav>
                                            <div className="nav-tabs-head">
                                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                                    <button className="nav-link active" id="nav-tab-0" data-bs-toggle="tab" data-bs-target="#tab-0" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Call Detail Wise</button>
                                                    <button className="nav-link" id="nav-tab-1" data-bs-toggle="tab" data-bs-target="#tab-1" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Prospect Wise</button>
                                                </div>
                                            </div>
                                        </nav>
                                        <div className="tab-content border bg-light" id="nav-tabContent">
                                            <div className="tab-pane fade active show" id="tab-0" role="tabpanel" aria-labelledby="nav-tab-0">
                                                
                                                <div className="row">

                                                    <div className="col-12 col-lg-2 col-md-2 col-xl-2 jss-pl15-pr5">
                                                        <div class="jss152">
                                                            <div class="jss156 jss161 jss158 jss159">
                                                                <div class="jss257 jss259">
                                                                    <i class="fa fa-compress fa-4x"></i>
                                                                </div>
                                                                <h4 class="jss255">220</h4>
                                                            </div>
                                                            <div class="jss264 jss267">
                                                                <div class="jss252">
                                                                    <a href="#pablo">Total Calls</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-lg-2 col-md-2 col-xl-2 jss-p-5">
                                                        <div class="jss152">
                                                            <div class="jss156 jss161 jss158 jss159">
                                                                <div class="jss257 jss262">
                                                                    <i class="fa fa-arrow-down fa-4x"></i>
                                                                </div>
                                                                <h4 class="jss255">20</h4>
                                                            </div>
                                                            <div class="jss264 jss267">
                                                                <div class="jss252">
                                                                    <a href="#pablo">Total Incoming</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-lg-2 col-md-2 col-xl-2 jss-p-5">
                                                        <div class="jss152">
                                                            <div class="jss156 jss161 jss158 jss159">
                                                                <div class="jss257 jss259">
                                                                    <i class="fa fa-arrow-up fa-4x"></i>
                                                                </div>
                                                                <h4 class="jss255">250</h4>
                                                            </div>
                                                            <div class="jss264 jss267">
                                                                <div class="jss252">
                                                                    <a href="#pablo">Total Outgoing</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-lg-2 col-md-2 col-xl-2 jss-p-5">
                                                        <div class="jss152">
                                                            <div class="jss156 jss161 jss158 jss159">
                                                                <div class="jss257 jss260">
                                                                    <i class="fa fa-retweet fa-4x"></i>
                                                                </div>
                                                                <h4 class="jss255">2</h4>
                                                            </div>
                                                            <div class="jss264 jss267">
                                                                <div class="jss252">
                                                                    <a href="#pablo">Total Missed</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-lg-2 col-md-2 col-xl-2 jss-p-5">
                                                        <div class="jss152">
                                                            <div class="jss156 jss161 jss158 jss159">
                                                                <div class="jss257 jss259">
                                                                    <i class="fa fa-volume-control-phone fa-4x"></i>
                                                                </div>
                                                                <h4 class="jss255">00:49:20</h4>
                                                            </div>
                                                            <div class="jss264 jss267">
                                                                <div class="jss252">
                                                                    <a href="#pablo">Total TalkTime</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-lg-2 col-md-2 col-xl-2 jss-pr15-pl5">
                                                        <div class="jss152">
                                                            <div class="jss156 jss161 jss158 jss159">
                                                                <div class="jss257 jss259">
                                                                    <i class="fa fa-microphone fa-4x"></i>
                                                                </div>
                                                                <h4 class="jss255">0</h4>
                                                            </div>
                                                            <div class="jss264 jss267">
                                                                <div class="jss252">
                                                                    <a href="#pablo">Total Recordings</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="row">
                                                    <div className="col-12 col-lg-12 col-md-12 col-xl-12">
                                                        <div className="jss145 jss148">
                                                            <div className="jss149 jss157">
                                                                <div className="sc-dlMDgC kLgUfe">
                                                                    <div className="sc-fKgJPI dfhKER">
                                                                        <div className="sc-bdnxRM cWvbDL rdt_Table" role="table">
                                                                            <div className="sc-gtsrHT juhBur rdt_TableHead" role="rowgroup">
                                                                                <div className="sc-dlnjwi NLcNa rdt_TableHeadRow" role="row">
                                                                                    <div className="sc-hKFxyN sc-eCApnc sc-iqAclL isMUWa fqlAYs iupIzr rdt_TableCol">
                                                                                        <div id="column-1" role="columnheader" tabIndex={0} className="sc-crzoAE huXcZJ rdt_TableCol_Sortable">
                                                                                            <div className="sc-dIsUp jEEywD">Hour</div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="sc-hKFxyN sc-eCApnc sc-iqAclL isMUWa fqlAYs iupIzr rdt_TableCol">
                                                                                        <div id="column-2" role="columnheader" tabIndex={0} className="sc-crzoAE huXcZJ rdt_TableCol_Sortable">
                                                                                            <div className="sc-dIsUp jEEywD">Total Calls</div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="sc-hKFxyN sc-eCApnc sc-iqAclL isMUWa fqlAYs iupIzr rdt_TableCol">
                                                                                        <div id="column-3" role="columnheader" tabIndex={0} className="sc-crzoAE huXcZJ rdt_TableCol_Sortable">
                                                                                            <div className="sc-dIsUp jEEywD">Connected Calls</div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="sc-hKFxyN sc-eCApnc sc-iqAclL isMUWa fqlAYs iupIzr rdt_TableCol">
                                                                                        <div id="column-4" role="columnheader" tabIndex={0} className="sc-crzoAE huXcZJ rdt_TableCol_Sortable">
                                                                                            <div className="sc-dIsUp jEEywD">Outgoing Calls</div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="sc-hKFxyN sc-eCApnc sc-iqAclL isMUWa fqlAYs iupIzr rdt_TableCol">
                                                                                        <div id="column-5" role="columnheader" tabIndex={0} className="sc-crzoAE huXcZJ rdt_TableCol_Sortable">
                                                                                            <div className="sc-dIsUp jEEywD">Incoming Calls</div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="sc-hKFxyN sc-eCApnc sc-iqAclL isMUWa fqlAYs iupIzr rdt_TableCol">
                                                                                        <div id="column-6" role="columnheader" tabIndex={0} className="sc-crzoAE huXcZJ rdt_TableCol_Sortable">
                                                                                            <div className="sc-dIsUp jEEywD">Missed Calls</div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="sc-hKFxyN sc-eCApnc sc-iqAclL isMUWa fqlAYs iupIzr rdt_TableCol">
                                                                                        <div id="column-7" role="columnheader" tabIndex={0} className="sc-crzoAE huXcZJ rdt_TableCol_Sortable">
                                                                                            <div className="sc-dIsUp jEEywD">Talktime</div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div offset="250px" className="sc-hHEiqL clIRY rdt_TableBody" role="rowgroup">
                                                                                <div id="row-1" role="row" className="sc-jrsJWt bQvvuz rdt_TableRow">
                                                                                    <div id="cell-1-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <div data-tag="allowRowEvents">Time - 7 am</div>
                                                                                    </div>
                                                                                    <div id="cell-2-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <div data-tag="allowRowEvents">1</div>
                                                                                    </div>
                                                                                    <div id="cell-3-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <div data-tag="allowRowEvents">1</div>
                                                                                    </div>
                                                                                    <div id="cell-4-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <div data-tag="allowRowEvents">1</div>
                                                                                    </div>
                                                                                    <div id="cell-5-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <div data-tag="allowRowEvents">0</div>
                                                                                    </div>
                                                                                    <div id="cell-6-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <div data-tag="allowRowEvents">0</div>
                                                                                    </div>
                                                                                    <div id="cell-7-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs haFOUQ rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <span>0:21</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div id="row-2" role="row" className="sc-jrsJWt bQvvuz rdt_TableRow">
                                                                                    <div id="cell-1-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <div data-tag="allowRowEvents">Time - 9 am</div>
                                                                                    </div>
                                                                                    <div id="cell-2-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <div data-tag="allowRowEvents">1</div>
                                                                                    </div>
                                                                                    <div id="cell-3-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <div data-tag="allowRowEvents">1</div>
                                                                                    </div>
                                                                                    <div id="cell-4-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <div data-tag="allowRowEvents">1</div>
                                                                                    </div>
                                                                                    <div id="cell-5-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <div data-tag="allowRowEvents">0</div>
                                                                                    </div>
                                                                                    <div id="cell-6-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <div data-tag="allowRowEvents">0</div>
                                                                                    </div>
                                                                                    <div id="cell-7-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs haFOUQ rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <span>0:21</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div id="row-3" role="row" className="sc-jrsJWt bQvvuz rdt_TableRow">
                                                                                    <div id="cell-1-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <div data-tag="allowRowEvents">Time - 10 am</div>
                                                                                    </div>
                                                                                    <div id="cell-2-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <div data-tag="allowRowEvents">1</div>
                                                                                    </div>
                                                                                    <div id="cell-3-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <div data-tag="allowRowEvents">1</div>
                                                                                    </div>
                                                                                    <div id="cell-4-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <div data-tag="allowRowEvents">1</div>
                                                                                    </div>
                                                                                    <div id="cell-5-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <div data-tag="allowRowEvents">0</div>
                                                                                    </div>
                                                                                    <div id="cell-6-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <div data-tag="allowRowEvents">0</div>
                                                                                    </div>
                                                                                    <div id="cell-7-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs haFOUQ rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <span>0:21</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div id="row-4" role="row" className="sc-jrsJWt bQvvuz rdt_TableRow">
                                                                                    <div id="cell-1-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <div data-tag="allowRowEvents">Time - 11 am</div>
                                                                                    </div>
                                                                                    <div id="cell-2-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <div data-tag="allowRowEvents">1</div>
                                                                                    </div>
                                                                                    <div id="cell-3-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <div data-tag="allowRowEvents">1</div>
                                                                                    </div>
                                                                                    <div id="cell-4-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <div data-tag="allowRowEvents">1</div>
                                                                                    </div>
                                                                                    <div id="cell-5-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <div data-tag="allowRowEvents">0</div>
                                                                                    </div>
                                                                                    <div id="cell-6-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <div data-tag="allowRowEvents">0</div>
                                                                                    </div>
                                                                                    <div id="cell-7-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs haFOUQ rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <span>0:21</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div id="row-5" role="row" className="sc-jrsJWt bQvvuz rdt_TableRow">
                                                                                    <div id="cell-1-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <div data-tag="allowRowEvents">Time - 12 am</div>
                                                                                    </div>
                                                                                    <div id="cell-2-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <div data-tag="allowRowEvents">1</div>
                                                                                    </div>
                                                                                    <div id="cell-3-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <div data-tag="allowRowEvents">1</div>
                                                                                    </div>
                                                                                    <div id="cell-4-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <div data-tag="allowRowEvents">1</div>
                                                                                    </div>
                                                                                    <div id="cell-5-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <div data-tag="allowRowEvents">0</div>
                                                                                    </div>
                                                                                    <div id="cell-6-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs dJQkQf rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <div data-tag="allowRowEvents">0</div>
                                                                                    </div>
                                                                                    <div id="cell-7-undefined" role="gridcell" className="sc-hKFxyN sc-eCApnc sc-jSFjdj cGmWKS fqlAYs haFOUQ rdt_TableCell" data-tag="allowRowEvents">
                                                                                        <span>0:21</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="jss163">
                                                                <i>Agent call tracking Hourly report</i>
                                                            </div>
                                                            <div className="jss187 jss191" /></div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="tab-1" role="tabpanel" aria-labelledby="nav-tab-1">
                                                
                                                <div className="row">
                                                    <div className="col-12 col-lg-3 col-md-3 col-xl-3 jss-pl15-pr5">
                                                        <div class="jss152">
                                                            <div class="jss156 jss161 jss158 jss159">
                                                                <div class="jss257 jss259">
                                                                    <i class="fa fa-bullhorn fa-5x"></i>
                                                                </div>
                                                                <p class="jss176">Active Campaigns</p>
                                                                <h4 class="jss255">1</h4>
                                                            </div>
                                                            <div class="jss264 jss267">
                                                                <div class="jss252">
                                                                    <a href="#pablo">View Details</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-lg-3 col-md-3 col-xl-3 jss-p-5">
                                                        <div class="jss152">
                                                            <div class="jss156 jss161 jss158 jss159">
                                                                <div class="jss257 jss262">
                                                                    <i class="fa fa-users fa-5x"></i>
                                                                </div>
                                                                <p class="jss176">Assigned Members</p>
                                                                <h4 class="jss255">58</h4>
                                                            </div>
                                                            <div class="jss264 jss267">
                                                                <div class="jss252">
                                                                    <a href="#pablo">View Details</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-lg-3 col-md-3 col-xl-3 jss-p-5">
                                                        <div class="jss152">
                                                            <div class="jss156 jss161 jss158 jss159">
                                                                <div class="jss257 jss259">
                                                                    <i class="fa fa-address-card fa-5x"></i>
                                                                </div>
                                                                <p class="jss176">Fresh Prospects</p>
                                                                <h4 class="jss255">250</h4>
                                                            </div>
                                                            <div class="jss264 jss267">
                                                                <div class="jss252">
                                                                    <a href="#pablo">View Details</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-lg-3 col-md-3 col-xl-3 jss-pr15-pl5">
                                                        <div class="jss152">
                                                            <div class="jss156 jss161 jss158 jss159">
                                                                <div class="jss257 jss259">
                                                                    <i class="fa fa-phone fa-4x"></i>
                                                                </div>
                                                                <p class="jss176">Total Follow up</p>
                                                                <h4 class="jss255">336825</h4>
                                                            </div>
                                                            <div class="jss264 jss267">
                                                                <div class="jss252">
                                                                    <a href="#pablo">View Details</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-12 col-lg-2 col-md-2 col-xl-2 jss-pl15-pr5">
                                                        <div class="jss152">
                                                            <div class="jss156 jss161 jss158 jss159">
                                                                <div class="jss257 jss259">
                                                                    <i class="fa fa-user-plus fa-4x"></i>
                                                                </div>
                                                                <h4 class="jss255">1128</h4>
                                                            </div>
                                                            <div class="jss264 jss267">
                                                                <div class="jss252">
                                                                    <a href="#pablo">New Prospects</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-lg-2 col-md-2 col-xl-2 jss-p-5">
                                                        <div class="jss152">
                                                            <div class="jss156 jss161 jss158 jss159">
                                                                <div class="jss257 jss262">
                                                                    <i class="fa fa-phone fa-4x"></i>
                                                                </div>
                                                                <h4 class="jss255">20</h4>
                                                            </div>
                                                            <div class="jss264 jss267">
                                                                <div class="jss252">
                                                                    <a href="#pablo">Total Calls</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-lg-2 col-md-2 col-xl-2 jss-p-5">
                                                        <div class="jss152">
                                                            <div class="jss156 jss161 jss158 jss159">
                                                                <div class="jss257 jss259">
                                                                    <i class="fa fa-check-circle fa-4x"></i>
                                                                </div>
                                                                <h4 class="jss255">250</h4>
                                                            </div>
                                                            <div class="jss264 jss267">
                                                                <div class="jss252">
                                                                    <a href="#pablo">Total Prospects</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-lg-2 col-md-2 col-xl-2 jss-p-5">
                                                        <div class="jss152">
                                                            <div class="jss156 jss161 jss158 jss159">
                                                                <div class="jss257 jss260">
                                                                <i class="fa fa-check-circle fa-4x"></i>
                                                                </div>
                                                                <h4 class="jss255">555</h4>
                                                            </div>
                                                            <div class="jss264 jss267">
                                                                <div class="jss252">
                                                                    <a href="#pablo">Fresh Prospects</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-lg-2 col-md-2 col-xl-2 jss-p-5">
                                                        <div class="jss152">
                                                            <div class="jss156 jss161 jss158 jss159">
                                                                <div class="jss257 jss259">
                                                                    <i class="fa fa-calendar fa-4x"></i>
                                                                </div>
                                                                <h4 class="jss255">654</h4>
                                                            </div>
                                                            <div class="jss264 jss267">
                                                                <div class="jss252">
                                                                    <a href="#pablo">Followup Calls</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-lg-2 col-md-2 col-xl-2 jss-pr15-pl5">
                                                        <div class="jss152">
                                                            <div class="jss156 jss161 jss158 jss159">
                                                                <div class="jss257 jss259">
                                                                    <i class="fa fa-calendar fa-4x"></i>
                                                                </div>
                                                                <h4 class="jss255">335307</h4>
                                                            </div>
                                                            <div class="jss264 jss267">
                                                                <div class="jss252">
                                                                    <a href="#pablo">Overdue Followups</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-12 col-lg-6 col-md-6 col-xl-6">
                                                        <div className="jss145 jss148">
                                                            <div className="jss149 jss157">
                                                                <div className="dashboard-pie-chart-wrap">
                                                                    <div className="pie-chart-head">
                                                                        <h1>Latest Responses</h1>
                                                                    </div>
                                                            </div>
                                                            </div>
                                                            <div className="jss187 jss191" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-lg-6 col-md-6 col-xl-6">
                                                        <div className="jss145 jss148">
                                                            <div className="jss149 jss157">
                                                                <div className="dashboard-pie-chart-wrap">
                                                                    <div className="pie-chart-head">
                                                                        <h1>Campaign-wise Responses</h1>
                                                                    </div>
                                                            </div>
                                                            </div>
                                                            <div className="jss187 jss191" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-12 col-lg-12 col-md-12 col-xl-12">
                                                        <div className="jss145 jss148">
                                                            <div className="jss149 jss157">
                                                                <div className="dashboard-pie-chart-wrap">
                                                                    <div className="pie-chart-head">
                                                                        <h1>Agent-wise Responses</h1>
                                                                    </div>
                                                            </div>
                                                            </div>
                                                            <div className="jss187 jss191" />
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

export default Dashboard;
