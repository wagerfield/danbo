###
#============================================================
#
# Danbo: Main Class
#
# @author Matthew Wagerfield @mwagerfield
#
#============================================================
###

class PROJECT.Main extends Class

  ###
  #========================================
  # Class Variables
  #========================================
  ###

  @class = 'PROJECT.Main'



  ###
  #========================================
  # Instance Variables
  #========================================
  ###

  $html: null
  $body: null
  $container: null
  $scene: null

  # Properties
  layout: null
  scene: null
  raf: null



  ###
  #========================================
  # Instance Methods
  #========================================
  ###

  constructor: () ->

    # Cache selections.
    @$html = $ 'html'
    @$body = $ 'body'
    @$container = @$body.find '#container'
    @$scene = @$container.find '#scene'
    return

  initialise: () =>
    super

    # Add classes.
    @addClasses()

    # Kick off the animation loop.
    @animate()
    return

  addClasses: () =>

    # Create and initialise the layout.
    @layout = new Layout
    @layout.initialise()

    # Create and initialise the scene.
    @scene = new SCENE.Scene
    @scene.initialise @$scene
    return

  animate: () =>

    # Call the update method using the requestAnimationFrame callback.
    @raf = requestAnimationFrame @animate

    # Call the root update method.
    @update()
    return

  update: () =>

    # Update the scene.
    @scene.update()
    return



# Create instance of Main class.
@DANBO = DANBO = new PROJECT.Main
