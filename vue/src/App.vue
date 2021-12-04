<template>
  <div id="app">
    <!-- Header -->
    <div class="header">
      <b-navbar
        class="d-flex justify-content-around"
        variant="light"
        type="light"
      >
        <b-navbar variant="faded" type="light">
          <b-navbar-brand to="/">Journal</b-navbar-brand>
        </b-navbar>
        <b-navbar-nav>
          <b-nav-item to="/add">Add Note</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item to="/notes">Notes</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item to="/login">Login</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>

    <!-- Page Display -->
    <router-view />

    <!-- Footer -->
    <b-navbar
      class="fixed-bottom d-flex justify-content-between"
      variant="light"
      type="light"
    >
      <b-navbar-nav class="p-2">
        <b-nav-item href="https://github.com/mg35/cp5.git" active
          >Github</b-nav-item
        >
      </b-navbar-nav>
      <b-navbar-nav class="p-2">
        <b-nav-text>
          Created by TJ VanderLouw, Milvia Goulding, and Melissa Morris
        </b-nav-text>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>
