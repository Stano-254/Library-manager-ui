<template>
    <div>

        <div class="position-relative">
            <!-- shape Hero -->
            <section class="section-shaped my-0">
                <router-link to="/login" class="float-right text-white m-3 px-5 py-2 h4 btn-warning btn-fill float-right rounded font-weight-bold ">Login</router-link>
                <div class="shape shape-style-1 shape-default shape-skew">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="container shape-container d-flex ">
                    <div class="col px-0">
                        <div class="row">
                            <div class="col-lg-8">
                                <img src="img/library-management-system-logo.png" alt="Library Management system" width="100%">
                                <!-- <h1 class="display-3  text-white"><b>Library Management system</b> -->
                                    <!-- <span>here at your service</span> -->
                                </h1>
                                <p class="lead  text-white">The designed to ease of management of libabry resources. Including borowing and return of books</p>
                                <!-- <router-link to="/login" class="float-left text-white m-3 px-5 py-2 h4 btn-warning btn-fill float-left rounded font-weight-bold ">Login</router-link> -->
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>
            <!-- 1st Hero Variation -->
        </div>
        <section class="section section-lg pt-lg-0 mt--200">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-12">
                        <div class="row row-grid">
                            <div class="col-lg-4">
                                <card class="border-0 hover shadow" body-classes="py-5">
                                    <icon name="ni ni-check-bold" type="primary" rounded class="mb-4">
                                    </icon>
                                    <h6 class="text-primary text-uppercase">State of the art Library</h6>
                                    <p class="description mt-3">we pride ourselves with having one of the stste of the art library in the world</p>
                                    <div>
                                        <badge type="primary" rounded>State</badge>
                                        <badge type="primary" rounded>Of</badge>
                                        <badge type="primary" rounded>The Art</badge>
                                    </div>
                                    <base-button tag="a" href="#" type="primary" class="mt-4">
                                        Learn more
                                    </base-button>
                                </card>
                            </div>
                            <div class="col-lg-4">
                                <card class="border-0 hover shadow" body-classes="py-5">
                                    <icon name="ni ni-istanbul" type="success" rounded class="mb-4">
                                    </icon>
                                    <h6 class="text-success text-uppercase">Vast Resources</h6>
                                    <p class="description mt-3">We offer vast resources among them books, publications, thesis among other materials</p>
                                    <div>
                                        <badge type="success" rounded>Books</badge>
                                        <badge type="success" rounded>Journals</badge>
                                        <badge type="success" rounded>publications</badge>
                                    </div>
                                    <base-button tag="a" href="#" type="success" class="mt-4">
                                        Learn more
                                    </base-button>
                                </card>
                            </div>
                            <div class="col-lg-4">
                                <card class="border-0 hover shadow" body-classes="py-5">
                                    <icon name="ni ni-planet" type="warning" rounded class="mb-4">
                                    </icon>
                                    <h6 class="text-warning text-uppercase">Opening Hours</h6>
                                    <p class="description mt-3">Monday - Friday: 8.00 AM - 10.00PM</p>
                                    <p class="description mt-3">Weekends: 8.00 AM - 4.00PM</p>
                                    <p class="description mt-3">Holidays we are closed</p>
                                    <div>
                                        <badge type="warning" rounded>OPENING</badge>
                                        <badge type="warning" rounded>HOURS</badge>
                                        <badge type="warning" rounded>cLOSING</badge>
                                    </div>
                                    <base-button tag="a" href="#" type="warning" class="mt-4">
                                        Learn more
                                    </base-button>
                                </card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
       
        <section class="section bg-secondary">
            <div class="container">
                <div class="row row-grid align-items-center">
                    <div class="col-md-6">
                        <div class="card bg-default shadow border-0">
                            <img v-lazy="'img/theme/img-1-1200x1000.jpg'" class="card-img-top">
                            <blockquote class="card-blockquote">
                                <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 583 95"
                                     class="svg-bg">
                                    <polygon points="0,52 583,95 0,95" class="fill-default"></polygon>
                                    <polygon points="0,42 583,95 683,0 0,95" opacity=".2" class="fill-default"></polygon>
                                </svg>
                                <h4 class="display-3 font-weight-bold text-white">Library info</h4>
                                <p class="lead text-italic text-white">To our esteemed customer we are proud of you and we will 
                                    continue to open our doors in service of you and your curiosity through providing access to resources</p>
                            </blockquote>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="pl-md-5">
                            <icon name="ni ni-settings" class="mb-5" size="lg" type="warning" shadow rounded></icon>

                            <h3>Our customers</h3>
                            <p class="lead">We will endoveour to deliver our best, to serve you. 
                                You can always call for any assitance or email us at info@library.com
                            </p>
                           
                            <a href="#" class="font-weight-bold text-warning mt-5">Simply the best</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      

    </div>
</template>

<script>
export default {
  name: "Landing",
  components: {}
};
</script>