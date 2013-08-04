###
#============================================================
#
# Danbo: Scene Composition
#
# @author Matthew Wagerfield @mwagerfield
#
#============================================================
###

class SCENE.Scene extends Class

  ###
  #========================================
  # Class Variables
  #========================================
  ###

  @class = 'SCENE.Scene'



  ###
  #========================================
  # Instance Variables
  #========================================
  ###

  $context: null



  ###
  #========================================
  # Instance Methods
  #========================================
  ###

  initialise: (@$context) =>
    super
    @addEventListeners()
    return

  addEventListeners: () =>
    DANBO.layout.resized.add @onResize
    return

  update: () =>
    return



  ###
  #========================================
  # Callbacks
  #========================================
  ###

  onResize: (dimensions) =>
    return
