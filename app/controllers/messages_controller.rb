class MessagesController < ApplicationController
  before_action :set_group
  def index
  end

  def new
  end

  def create
  end

  def edit
  end

  def update
  end

  private
  def set_group
    @group = Group.find(params[:group_id])
  end
end
