 // add to Select/Dropdown or any other with dropdown  getPopupContainer={(trigger) => trigger.parentNode}
<Dropdown
                  trigger={["click"]}
                  overlay={
                    <DropdownMenu
                      id={item.id}
                      onDeleteVideo={deleteVideo}
                      onPublishVideo={publishVideo}
                      isPublished={item.published}
                    />
                  }
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placement="bottomCenter"
                  arrow
                >
                  <MoreOutlined />
                </Dropdown>
